import { chamarApi } from "./apiLocal";
import type * as Local from "./personagens";

export type { PersonagemResumido } from "./personagens";

export const listarPersonagens: typeof Local.listarPersonagens = () =>
  chamarApi("/personagens");

export const listarAntecedentes: typeof Local.listarAntecedentes = () =>
  chamarApi("/antecedentes");

export const sortearTormento: typeof Local.sortearTormento = () =>
  chamarApi("/tormento");

export const listarHabilidades: typeof Local.listarHabilidades = () =>
  chamarApi("/habilidades");

export const salvarPersonagem: typeof Local.salvarPersonagem = async (ficha, perfil) => {
  await chamarApi("/salvar-ficha", { ficha, perfil });
};
