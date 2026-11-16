const { createServer } = require("node:http");
const { randomUUID } = require("node:crypto");
const { existsSync } = require("node:fs");
const { resolve } = require("node:path");
const { conectarBanco } = require("./banco.cjs");

const caminho = process.argv[2];
if (!caminho || !existsSync(caminho)) {
  console.error("Informe o caminho do arquivo SQLite existente.");
  process.exit(1);
}

const { usuarios, personagens } = conectarBanco(resolve(caminho));
const sessoes = new Map();
const porta = Number(process.env.OSDS_API_PORTA || 8083);
const origens = new Set(["http://localhost:8082", "http://127.0.0.1:8082"]);

function responder(res, status, dados) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(JSON.stringify(dados));
}

async function lerDados(req) {
  const partes = [];
  let tamanho = 0;
  for await (const parte of req) {
    tamanho += parte.length;
    if (tamanho > 32768) throw new Error("Dados muito grandes.");
    partes.push(parte);
  }
  return JSON.parse(Buffer.concat(partes).toString("utf8"));
}

function texto(valor, maximo = 1000) {
  return typeof valor === "string" && valor.length <= maximo;
}

function fichaValida(ficha, perfil) {
  if (!ficha || !perfil || !ficha.atributos || !ficha.antecedentes) return false;
  const { fisico, agilidade, intelecto, coragem } = ficha.atributos;
  const atributos = [fisico, agilidade, intelecto, coragem];
  const antecedentes = Object.entries(ficha.antecedentes);
  return atributos.every((p) => Number.isInteger(p) && p >= 0 && p <= 4)
    && atributos.reduce((soma, p) => soma + p, 0) === 4
    && antecedentes.every(([id, p]) => /^[1-9][0-9]*$/.test(id) && Number.isInteger(p) && p >= 0 && p <= 2)
    && antecedentes.reduce((soma, [, p]) => soma + p, 0) === 4 + intelecto
    && Array.isArray(ficha.habilidades) && ficha.habilidades.length === 2
    && ficha.habilidades.every((id) => Number.isInteger(id) && id > 0)
    && ficha.habilidades[0] !== ficha.habilidades[1]
    && texto(ficha.tormento) && ficha.tormento.trim()
    && (ficha.tormentoId === null || (Number.isInteger(ficha.tormentoId) && ficha.tormentoId > 0))
    && texto(perfil.nome, 150) && perfil.nome.trim()
    && [perfil.passado, perfil.aparencia, perfil.objetivos].every((campo) => texto(campo));
}

const servidor = createServer(async (req, res) => {
  if (!["localhost:" + porta, "127.0.0.1:" + porta].includes(req.headers.host)
    || !origens.has(req.headers.origin)) {
    return responder(res, 403, { erro: "Origem não permitida." });
  }

  res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.writeHead(204).end();
  if (req.method !== "POST") return responder(res, 405, { erro: "Método inválido." });
  if (req.headers["content-type"] !== "application/json") {
    return responder(res, 415, { erro: "Envie dados JSON." });
  }

  let dados;
  try {
    dados = await lerDados(req);
    if (!dados || typeof dados !== "object" || Array.isArray(dados)) throw new Error();
  } catch {
    return responder(res, 400, { erro: "Dados inválidos." });
  }

  try {
    if (req.url === "/cadastro") {
      const { nome, usuario, email, senha } = dados;
      if (!texto(nome, 150) || !nome.trim() || !texto(usuario, 100) || !usuario.trim()
        || !texto(email, 254) || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())
        || !texto(senha, 256) || senha.length < 8) {
        return responder(res, 400, { erro: "Dados de cadastro inválidos." });
      }
      return responder(res, 200, await usuarios.cadastrarUsuario(nome, usuario, email, senha));
    }

    if (req.url === "/login") {
      if (!texto(dados.email, 254) || !texto(dados.senha, 256)) {
        return responder(res, 400, { erro: "Dados de login inválidos." });
      }
      const usuario = await usuarios.conferirLogin(dados.email, dados.senha);
      if (!usuario) return responder(res, 200, null);
      const token = randomUUID();
      sessoes.set(token, usuario);
      return responder(res, 200, { usuario, token });
    }

    const token = req.headers.authorization?.replace(/^Bearer /, "");
    const usuario = sessoes.get(token);
    if (!usuario) return responder(res, 401, { erro: "Entre novamente para continuar." });

    switch (req.url) {
      case "/sair":
        sessoes.delete(token);
        return responder(res, 200, null);
      case "/personagens":
        return responder(res, 200, await personagens.listarPersonagens(usuario.id));
      case "/antecedentes":
        return responder(res, 200, await personagens.listarAntecedentes());
      case "/tormento":
        return responder(res, 200, await personagens.sortearTormento());
      case "/habilidades":
        return responder(res, 200, await personagens.listarHabilidades());
      case "/salvar-ficha":
        if (!fichaValida(dados.ficha, dados.perfil)) {
          return responder(res, 400, { erro: "Confira os dados da ficha." });
        }
        await personagens.salvarPersonagem({ ...dados.ficha, usuario }, dados.perfil);
        return responder(res, 201, null);
      default:
        return responder(res, 404, { erro: "Rota não encontrada." });
    }
  } catch (erro) {
    if (String(erro).includes("Limite de cinco personagens")) {
      return responder(res, 409, { erro: "Limite de cinco personagens por conta." });
    }
    console.error(erro.message);
    return responder(res, 500, { erro: "Falha ao acessar o banco local." });
  }
});

servidor.listen(porta, "127.0.0.1", () => {
  console.log(`SQLite local em http://127.0.0.1:${porta}`);
  console.log(resolve(caminho));
});
