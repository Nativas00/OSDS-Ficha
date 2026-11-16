
export type PontosAtributos = {
  fisico: number;
  agilidade: number;
  intelecto: number;
  coragem: number;
};

type Usuario = {
  id: string;
  nome: string;
};

export type FichaInicial = {
  usuario: Usuario;
  atributos: PontosAtributos;
  antecedentes: Record<number, number>;
};

export type FichaComTormento = FichaInicial & {
  tormento: string;
  tormentoId: number | null;
};

export type RootStackParamList = {
  FirstScreen: undefined;
  Login: undefined;
  Register: undefined;

  Home: { usuario: Usuario };
  Attributes: { usuario: Usuario };
  Backgrounds: {
    usuario: Usuario;
    atributos: PontosAtributos;
  };
  Torments: FichaInicial;
  Skills: FichaComTormento;
  Profile: FichaComTormento & {
    habilidades: number[];
  };

  Character: { criando?: boolean } | undefined;
};
