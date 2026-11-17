const endereco = "https://api.randsum.dev/v1/roll";

type Rolagem = {
  notation: string;
  total: number;
  description: string;
};

export async function buscarRolagem() {
  const controle = new AbortController();
  const limite = setTimeout(() => controle.abort(), 8000);

  try {
    const resposta = await fetch(endereco + "?notation=1d6", {
      signal: controle.signal,
    });

    if (!resposta.ok) {
      throw new Error("A API de dados respondeu com erro " + resposta.status);
    }

    const dados: Rolagem = await resposta.json();

    if (!Number.isInteger(dados.total) || dados.total < 1 || dados.total > 6) {
      throw new Error("A API de dados devolveu um resultado inválido");
    }

    return dados.total;
  } finally {
    clearTimeout(limite);
  }
}
