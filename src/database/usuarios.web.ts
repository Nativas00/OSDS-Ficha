import { chamarApi, definirSessao } from "./apiLocal";

export function cadastrarUsuario(nome: string, usuario: string, email: string, senha: string) {
  return chamarApi<boolean>("/cadastro", { nome, usuario, email, senha });
}

export async function conferirLogin(email: string, senha: string) {
  const resultado = await chamarApi<{ usuario: { id: string; nome: string }; token: string } | null>(
    "/login", { email, senha }
  );
  definirSessao(resultado?.token ?? null);
  return resultado?.usuario ?? null;
}

export async function encerrarSessao() {
  const encerramento = chamarApi("/sair");
  definirSessao(null);
  await encerramento;
}
