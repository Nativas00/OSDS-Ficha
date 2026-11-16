import { randomUUID } from "expo-crypto";
import type { FichaComTormento } from "../Navigation/types";
import { habilidadesIniciais, tormentos } from "./catalogos";
import { abrirBanco } from "./usuarios";

export type PersonagemResumido = {
  id: string;
  nome: string;
  nivel: number;
};

let tabelas: ReturnType<typeof criarTabelas> | undefined;

function prepararTabelas() {
  if (!tabelas) {
    tabelas = criarTabelas().catch((erro) => {
      tabelas = undefined;
      throw erro;
    });
  }
  return tabelas;
}

async function criarTabelas() {
  const db = await abrirBanco();
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS tormentos_tabela (
      id INTEGER PRIMARY KEY,
      numero INTEGER NOT NULL UNIQUE,
      descricao TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS personagens (
      id TEXT PRIMARY KEY NOT NULL,
      usuario_id TEXT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
      nome TEXT NOT NULL,
      passado TEXT,
      aparencia TEXT,
      objetivos TEXT,
      nivel INTEGER NOT NULL DEFAULT 1,
      fisico INTEGER NOT NULL CHECK (fisico BETWEEN 0 AND 5),
      agilidade INTEGER NOT NULL CHECK (agilidade BETWEEN 0 AND 5),
      intelecto INTEGER NOT NULL CHECK (intelecto BETWEEN 0 AND 5),
      coragem INTEGER NOT NULL CHECK (coragem BETWEEN 0 AND 5),
      tormento TEXT,
      tormento_tabela_id INTEGER REFERENCES tormentos_tabela(id),
      vida_maxima INTEGER,
      vida_atual INTEGER,
      defesa INTEGER,
      acoes INTEGER,
      recompensa INTEGER,
      dinheiro INTEGER,
      reputacao TEXT,
      criado_em TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      atualizado_em TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS personagens_por_usuario ON personagens (usuario_id);

    CREATE TRIGGER IF NOT EXISTS limitar_personagens
    BEFORE INSERT ON personagens
    WHEN (SELECT COUNT(*) FROM personagens WHERE usuario_id = NEW.usuario_id) >= 5
    BEGIN
      SELECT RAISE(ABORT, 'Limite de cinco personagens por conta');
    END;

    CREATE TABLE IF NOT EXISTS antecedentes (
      id INTEGER PRIMARY KEY,
      codigo TEXT NOT NULL UNIQUE,
      nome TEXT NOT NULL,
      descricao TEXT,
      ordem INTEGER,
      ativo INTEGER NOT NULL DEFAULT 1 CHECK (ativo IN (0, 1))
    );

    INSERT INTO antecedentes (codigo, nome, ordem) VALUES
      ('combate', 'Combate', 1), ('labuta', 'Labuta', 2),
      ('negocios', 'Negócios', 3), ('montaria', 'Montaria', 4),
      ('exploracao', 'Exploração', 5), ('medicina', 'Medicina', 6),
      ('tradicao', 'Tradição', 7), ('roubo', 'Roubo', 8)
    ON CONFLICT(codigo) DO NOTHING;

    CREATE TABLE IF NOT EXISTS habilidades (
      id INTEGER PRIMARY KEY,
      codigo TEXT NOT NULL UNIQUE,
      nome TEXT NOT NULL,
      descricao TEXT,
      nivel_minimo INTEGER NOT NULL DEFAULT 1,
      ativo INTEGER NOT NULL DEFAULT 1 CHECK (ativo IN (0, 1))
    );

    CREATE TABLE IF NOT EXISTS personagem_antecedentes (
      personagem_id TEXT NOT NULL REFERENCES personagens(id) ON DELETE CASCADE,
      antecedente_id INTEGER NOT NULL REFERENCES antecedentes(id),
      pontos INTEGER NOT NULL CHECK (pontos BETWEEN 1 AND 5),
      PRIMARY KEY (personagem_id, antecedente_id)
    );

    CREATE TABLE IF NOT EXISTS personagem_habilidades (
      personagem_id TEXT NOT NULL REFERENCES personagens(id) ON DELETE CASCADE,
      habilidade_id INTEGER NOT NULL REFERENCES habilidades(id),
      nivel_obtida INTEGER NOT NULL,
      adquirida_em TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (personagem_id, habilidade_id)
    );
  `);
  const linhas = tormentos.flatMap(([categoria, opcoes], coluna) =>
    opcoes.map((opcao, linha) => ([(coluna + 1) * 10 + linha + 1, categoria + ": " + opcao] as const))
  );
  await db.runAsync(
    "INSERT INTO tormentos_tabela (numero, descricao) VALUES " +
      linhas.map(() => "(?, ?)").join(", ") + " ON CONFLICT(numero) DO NOTHING",
    linhas.flat()
  );
  await db.runAsync(
    "INSERT INTO habilidades (codigo, nome, descricao) VALUES " +
      habilidadesIniciais.map(() => "(?, ?, ?)").join(", ") +
      " ON CONFLICT(codigo) DO UPDATE SET descricao = excluded.descricao WHERE habilidades.descricao IS NULL",
    habilidadesIniciais.flatMap(([nome, descricao]) => [nome.toLowerCase(), nome, descricao])
  );
  return db;
}

export async function listarPersonagens(usuarioId: string) {
  const db = await prepararTabelas();
  return db.getAllAsync<PersonagemResumido>(
    "SELECT id, nome, nivel FROM personagens WHERE usuario_id = ? ORDER BY criado_em DESC, id",
    usuarioId
  );
}

type Opcao = { id: number; nome: string };

export async function listarAntecedentes() {
  const db = await prepararTabelas();
  return db.getAllAsync<Opcao>(
    "SELECT id, nome FROM antecedentes WHERE ativo = 1 ORDER BY ordem, id"
  );
}

function rolarD6() {
  return Math.floor(Math.random() * 6) + 1;
}

export async function sortearTormento() {
  const db = await prepararTabelas();
  return db.getFirstAsync<{ id: number; descricao: string }>(
    "SELECT id, descricao FROM tormentos_tabela WHERE numero = ?",
    rolarD6() * 10 + rolarD6()
  );
}

export async function listarHabilidades() {
  const db = await prepararTabelas();
  return db.getAllAsync<Opcao & { descricao: string | null }>(
    "SELECT id, nome, descricao FROM habilidades WHERE ativo = 1 AND nivel_minimo <= 1 ORDER BY nome"
  );
}

type Perfil = { nome: string; passado: string; aparencia: string; objetivos: string };

export async function salvarPersonagem(
  ficha: FichaComTormento & { habilidades: number[] },
  perfil: Perfil
) {
  const db = await prepararTabelas();
  const id = randomUUID();
  const { fisico, agilidade, intelecto, coragem } = ficha.atributos;

  let vida = 6;
  for (let ponto = 0; ponto < fisico; ponto++) {
    vida += rolarD6() + 2;
  }

  await db.withTransactionAsync(async () => {
    await db.runAsync(
      `INSERT INTO personagens (
        id, usuario_id, nome, passado, aparencia, objetivos,
        fisico, agilidade, intelecto, coragem, tormento, tormento_tabela_id,
        vida_maxima, vida_atual, defesa, acoes, reputacao
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 5, ?, ?)`,
      id, ficha.usuario.id, perfil.nome.trim(), perfil.passado.trim(),
      perfil.aparencia.trim(), perfil.objetivos.trim(),
      fisico, agilidade, intelecto, coragem, ficha.tormento, ficha.tormentoId,
      vida, vida, 1 + agilidade, "neutra"
    );

    for (const [antecedenteId, pontos] of Object.entries(ficha.antecedentes)) {
      if (pontos > 0) {
        await db.runAsync(
          "INSERT INTO personagem_antecedentes (personagem_id, antecedente_id, pontos) VALUES (?, ?, ?)",
          id, Number(antecedenteId), pontos
        );
      }
    }

    for (const habilidadeId of ficha.habilidades) {
      await db.runAsync(
        "INSERT INTO personagem_habilidades (personagem_id, habilidade_id, nivel_obtida) VALUES (?, ?, 1)",
        id, habilidadeId
      );
    }
  });

  return id;
}

export type DadosPersonagem = {
  id: string;
  nome: string;
  nivel: number;
  fisico: number;
  agilidade: number;
  intelecto: number;
  coragem: number;
  vida_maxima: number | null;
  vida_atual: number | null;
  defesa: number | null;
  acoes: number | null;
  tormento: string | null;
  recompensa: number | null;
  dinheiro: number | null;
  reputacao: string | null;
  habilidades_texto: string | null;
  antecedentes: { id: number; nome: string; pontos: number }[];
  habilidades: string[];
};

export type AtualizacaoPersonagem = {
  nivel: number;
  fisico: number;
  agilidade: number;
  intelecto: number;
  coragem: number;
  vida: number;
  defesa: number;
  acoes: number;
  tormento: string;
  recompensa: number;
  dinheiro: number;
  reputacao: string;
  antecedentes: Record<number, number>;
  habilidades: string;
};

async function garantirCamposExtras() {
  const db = await prepararTabelas();

  const colunas = await db.getAllAsync<{ name: string }>(
    "PRAGMA table_info(personagens)"
  );

  const existentes = colunas.map((coluna) => coluna.name);

  if (!existentes.includes("habilidades_texto")) {
    await db.execAsync(
      "ALTER TABLE personagens ADD COLUMN habilidades_texto TEXT"
    );
  }
}

export async function obterPersonagem(personagemId: string) {
  await garantirCamposExtras();

  const db = await prepararTabelas();

  const personagem = await db.getFirstAsync<Omit<DadosPersonagem, "antecedentes" | "habilidades">>(
    `SELECT
      id, nome, nivel,
      fisico, agilidade, intelecto, coragem,
      vida_maxima, vida_atual, defesa, acoes,
      tormento, recompensa, dinheiro, reputacao,
      habilidades_texto
    FROM personagens
    WHERE id = ?`,
    personagemId
  );

  if (!personagem) return null;

  const antecedentes = await db.getAllAsync<DadosPersonagem["antecedentes"][number]>(
    `SELECT a.id, a.nome, COALESCE(pa.pontos, 0) AS pontos
    FROM antecedentes a
    LEFT JOIN personagem_antecedentes pa
      ON pa.antecedente_id = a.id AND pa.personagem_id = ?
    WHERE a.ativo = 1
    ORDER BY a.ordem, a.id`,
    personagemId
  );

  const habilidades = await db.getAllAsync<{ nome: string }>(
    `SELECT h.nome
    FROM personagem_habilidades ph
    JOIN habilidades h ON h.id = ph.habilidade_id
    WHERE ph.personagem_id = ?
    ORDER BY h.nome`,
    personagemId
  );

  return {
    ...personagem,
    antecedentes,
    habilidades: habilidades.map((habilidade) => habilidade.nome),
  };
}

export async function atualizarPersonagem(
  personagemId: string,
  dados: AtualizacaoPersonagem
) {
  await garantirCamposExtras();

  const db = await prepararTabelas();

  let alteradas = 0;

  await db.withTransactionAsync(async () => {
    const resultado = await db.runAsync(
      `UPDATE personagens SET
        nivel = ?,
        fisico = ?,
        agilidade = ?,
        intelecto = ?,
        coragem = ?,
        vida_maxima = ?,
        vida_atual = ?,
        defesa = ?,
        acoes = ?,
        tormento = ?,
        recompensa = ?,
        dinheiro = ?,
        reputacao = ?,
        habilidades_texto = ?,
        atualizado_em = CURRENT_TIMESTAMP
      WHERE id = ?`,
      dados.nivel,
      dados.fisico,
      dados.agilidade,
      dados.intelecto,
      dados.coragem,
      dados.vida,
      dados.vida,
      dados.defesa,
      dados.acoes,
      dados.tormento,
      dados.recompensa,
      dados.dinheiro,
      dados.reputacao,
      dados.habilidades,
      personagemId
    );

    alteradas = resultado.changes;
    if (alteradas !== 1) return;

    await db.runAsync(
      "DELETE FROM personagem_antecedentes WHERE personagem_id = ?",
      personagemId
    );

    for (const [antecedenteId, pontos] of Object.entries(dados.antecedentes)) {
      if (pontos > 0) {
        await db.runAsync(
          "INSERT INTO personagem_antecedentes (personagem_id, antecedente_id, pontos) VALUES (?, ?, ?)",
          personagemId, Number(antecedenteId), pontos
        );
      }
    }
  });

  return alteradas === 1;
}
