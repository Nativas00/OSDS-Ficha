const endereco = "http://127.0.0.1:8083";
let sessao: string | null = null;

export function definirSessao(token: string | null) {
  sessao = token;
}

export async function chamarApi<T>(rota: string, dados: object = {}): Promise<T> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (sessao) headers.Authorization = "Bearer " + sessao;

  const resposta = await fetch(endereco + rota, {
    method: "POST",
    headers,
    body: JSON.stringify(dados),
  });
  const resultado = await resposta.json();
  if (!resposta.ok) throw new Error(resultado.erro);
  return resultado;
}
