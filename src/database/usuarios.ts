import * as SQLite from "expo-sqlite";
import { getRandomBytesAsync, randomUUID } from "expo-crypto";
import { pbkdf2Async } from "@noble/hashes/pbkdf2";
import { sha256 } from "@noble/hashes/sha256";
import { bytesToHex, hexToBytes } from "@noble/hashes/utils";

let banco: Promise<SQLite.SQLiteDatabase> | undefined;

export function abrirBanco() {
  if (!banco) {
    banco = (async () => {
      const db = await SQLite.openDatabaseAsync("osds_ficha.db");
      await db.execAsync(`
        PRAGMA foreign_keys = ON;
        CREATE TABLE IF NOT EXISTS usuarios (
          id TEXT PRIMARY KEY NOT NULL,
          nome_completo TEXT NOT NULL,
          nome_usuario TEXT NOT NULL UNIQUE,
          email TEXT NOT NULL UNIQUE,
          senha_hash TEXT NOT NULL,
          avatar_url TEXT,
          termos_aceitos_em TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          criado_em TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          atualizado_em TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
      `);
      return db;
    })().catch((erro) => {
      banco = undefined;
      throw erro;
    });
  }
  return banco;
}

async function gerarHash(senha: string, salt: Uint8Array) {
  const hash = await pbkdf2Async(sha256, senha, salt, { c: 600000, dkLen: 32 });
  return bytesToHex(hash);
}

export async function cadastrarUsuario(
  nome: string, usuario: string, email: string, senha: string
) {
  const db = await abrirBanco();
  const salt = await getRandomBytesAsync(16);
  const hash = await gerarHash(senha, salt);
  const resultado = await db.runAsync(
    `INSERT INTO usuarios (id, nome_completo, nome_usuario, email, senha_hash)
     VALUES (?, ?, ?, ?, ?) ON CONFLICT DO NOTHING`,
    randomUUID(), nome.trim(), usuario.trim().toLowerCase(),
    email.trim().toLowerCase(), bytesToHex(salt) + ":" + hash
  );

  return resultado.changes === 1;
}

export async function conferirLogin(email: string, senha: string) {
  const db = await abrirBanco();
  const usuario = await db.getFirstAsync<{ id: string; nome_usuario: string; senha_hash: string }>(
    "SELECT id, nome_usuario, senha_hash FROM usuarios WHERE email = ?",
    email.trim().toLowerCase()
  );
  if (!usuario) return null;

  const [salt, hashSalvo] = usuario.senha_hash.split(":");
  if ((await gerarHash(senha, hexToBytes(salt))) !== hashSalvo) return null;

  return { id: usuario.id, nome: usuario.nome_usuario };
}

export async function encerrarSessao() {
  // O Android mantém a conta ativa apenas enquanto a Home está na navegação.
}

// Verifica se existe uma conta cadastrada com o e-mail informado.
export async function verificarEmail(email: string) {
  const db = await abrirBanco();

  const usuario = await db.getFirstAsync<{ id: string }>(
    "SELECT id FROM usuarios WHERE email = ?",
    email.trim().toLowerCase()
  );

  return !!usuario;
}

// Atualiza a senha mantendo o padrão de segurança do cadastro.
export async function atualizarSenhaPorEmail(
  email: string,
  novaSenha: string
) {
  const db = await abrirBanco();

  const salt = await getRandomBytesAsync(16);
  const hash = await gerarHash(novaSenha, salt);

  const resultado = await db.runAsync(
    `UPDATE usuarios
     SET senha_hash = ?, atualizado_em = CURRENT_TIMESTAMP
     WHERE email = ?`,
    bytesToHex(salt) + ":" + hash,
    email.trim().toLowerCase()
  );

  return resultado.changes === 1;
}
