const { readFileSync } = require("node:fs");
const { join } = require("node:path");
const { DatabaseSync } = require("node:sqlite");
const { randomUUID, randomBytes } = require("node:crypto");
const ts = require("typescript");

// Carrega as mesmas regras e consultas que o app usa no Android.
function carregar(nome, dependencias = {}) {
  const arquivo = join(__dirname, "../src/database", nome + ".ts");
  const codigo = ts.transpileModule(readFileSync(arquivo, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;

  const modulo = { exports: {} };
  const importar = (nome) => dependencias[nome] ?? require(nome);
  new Function("exports", "require", codigo)(modulo.exports, importar);
  return modulo.exports;
}

function conectarBanco(caminho) {
  const db = new DatabaseSync(caminho);
  db.exec("PRAGMA busy_timeout = 3000; PRAGMA foreign_keys = ON;");
  const conexao = {
    execAsync: async (sql) => db.exec(sql),
    runAsync: async (sql, ...valores) => db.prepare(sql).run(...valores.flat()),
    getFirstAsync: async (sql, ...valores) => db.prepare(sql).get(...valores) ?? null,
    getAllAsync: async (sql, ...valores) => db.prepare(sql).all(...valores),
    withTransactionAsync: async (salvar) => {
      db.exec("BEGIN IMMEDIATE");
      try {
        await salvar();
        db.exec("COMMIT");
      } catch (erro) {
        db.exec("ROLLBACK");
        throw erro;
      }
    },
  };

  const crypto = { randomUUID, getRandomBytesAsync: async (tamanho) => randomBytes(tamanho) };
  const usuarios = carregar("usuarios", {
    "expo-sqlite": { openDatabaseAsync: async () => conexao },
    "expo-crypto": crypto,
  });
  const personagens = carregar("personagens", {
    "expo-crypto": crypto,
    "./usuarios": usuarios,
    "./catalogos": carregar("catalogos"),
  });
  return { usuarios, personagens };
}

module.exports = { conectarBanco };
