
import React, { useEffect, useRef, useState } from "react";

import {
  Animated,
  Easing,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import styles from "../style/StylesOverall";
import characterStyle from "../style/CharacterStyle";
import DotRow from "../Components/DotRow";
import Reveal from "../Components/Reveal";

import {
  obterPersonagem,
  atualizarPersonagem,
  type AtualizacaoPersonagem,
  type DadosPersonagem,
} from "../database/personagens";

import { buscarRolagem } from "../Services/rolagem";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../Navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Character">;

const NIVEIS = [1, 2, 3, 4, 5];

const atributos = ["Físico", "Agilidade", "Intelecto", "Coragem"];

const INTRO_MS = 1700;

export default function Character({ navigation, route }: Props) {
  const { personagemId, criando = false } = route.params;
  const base = criando ? INTRO_MS : 0;

  const [nome, setNome] = useState("");
  const [nivel, setNivel] = useState(1);
  const [nivelAberto, setNivelAberto] = useState(false);

  const [valores, setValores] = useState<Record<string, number>>({});
  const [antecedentes, setAntecedentes] = useState<DadosPersonagem["antecedentes"]>([]);
  const [dados, setDados] = useState({
    vida: "",
    defesa: "",
    acoes: "",
    tormento: "",
    recompensa: "",
    habilidades: "",
    reputacao: "",
    dinheiro: "",
  });

  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const [dado, setDado] = useState<string | null>(null);
  const rolando = useRef(false);
  const [introVisivel, setIntroVisivel] = useState(criando);

  const introOpacity = useRef(new Animated.Value(1)).current;
  const introScale = useRef(new Animated.Value(1.8)).current;
  const introLine = useRef(new Animated.Value(0)).current;
  const diceSpin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let ativa = true;

    async function carregar() {
      try {
        const personagem = await obterPersonagem(personagemId);

        if (!personagem) {
          if (ativa) {
            setMensagem("Personagem não encontrado.");
          }
          return;
        }

        if (!ativa) return;

        setNome(personagem.nome);
        setNivel(personagem.nivel);

        setValores({
          "Físico": personagem.fisico,
          "Agilidade": personagem.agilidade,
          "Intelecto": personagem.intelecto,
          "Coragem": personagem.coragem,
          ...Object.fromEntries(
            personagem.antecedentes.map((antecedente) => [
              antecedente.nome,
              antecedente.pontos,
            ])
          ),
        });
        setAntecedentes(personagem.antecedentes);

        setDados({
          vida: String(personagem.vida_atual ?? personagem.vida_maxima ?? ""),
          defesa: String(personagem.defesa ?? ""),
          acoes: String(personagem.acoes ?? ""),
          tormento: personagem.tormento ?? "",
          recompensa: String(personagem.recompensa ?? ""),
          habilidades:
            personagem.habilidades_texto || personagem.habilidades.join("\n"),
          reputacao: personagem.reputacao ?? "",
          dinheiro: String(personagem.dinheiro ?? ""),
        });
      } catch (erro) {
        console.error(erro);
        if (ativa) {
          setMensagem("Não foi possível carregar o personagem.");
        }
      } finally {
        if (ativa) setCarregando(false);
      }
    }

    carregar();

    return () => {
      ativa = false;
    };
  }, [personagemId]);

  useEffect(() => {
    if (!criando) return;

    Animated.sequence([
      Animated.parallel([
        Animated.spring(introScale, {
          toValue: 1,
          friction: 6,
          tension: 90,
          useNativeDriver: true,
        }),
        Animated.timing(introLine, {
          toValue: 1,
          duration: 900,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: false,
        }),
      ]),
      Animated.delay(450),
      Animated.timing(introOpacity, {
        toValue: 0,
        duration: 450,
        useNativeDriver: true,
      }),
    ]).start(() => setIntroVisivel(false));
  }, [criando, introScale, introLine, introOpacity]);

  const definirValor = (chave: string, valor: number) => {
    setValores((atual) => ({ ...atual, [chave]: valor }));
  };

  const alterarDado = (campo: string, valor: string) => {
    setDados((atual) => ({ ...atual, [campo]: valor }));
  };

  const numero = (valor: string) => {
    const convertido = Number(valor);
    return Number.isFinite(convertido) ? convertido : 0;
  };

  const salvar = async () => {
    if (salvando || carregando) return;

    setSalvando(true);
    setMensagem("");

    try {
      const dadosAtualizados: AtualizacaoPersonagem = {
        nivel,
        fisico: valores["Físico"] ?? 0,
        agilidade: valores["Agilidade"] ?? 0,
        intelecto: valores["Intelecto"] ?? 0,
        coragem: valores["Coragem"] ?? 0,
        vida: numero(dados.vida),
        defesa: numero(dados.defesa),
        acoes: numero(dados.acoes),
        tormento: dados.tormento,
        recompensa: numero(dados.recompensa),
        dinheiro: numero(dados.dinheiro),
        reputacao: dados.reputacao,
        antecedentes: Object.fromEntries(
          antecedentes.map((antecedente) => [
            antecedente.id,
            valores[antecedente.nome] ?? 0,
          ])
        ),
        habilidades: dados.habilidades,
      };

      const salvo = await atualizarPersonagem(
        personagemId,
        dadosAtualizados
      );

      if (!salvo) {
        throw new Error("Personagem não encontrado para atualização.");
      }

      navigation.reset({
        index: 0,
        routes: [
          {
            name: "Home",
            params: {
              usuario: route.params.usuario,
            },
          },
        ],
      });
    } catch (erro) {
      console.error(erro);
      setMensagem("Não foi possível salvar as características.");
    } finally {
      setSalvando(false);
    }
  };

  const rolarDado = async (nomeCampo?: string) => {
    if (rolando.current) return;

    rolando.current = true;
    diceSpin.setValue(0);
    setDado("Rolando...");

    Animated.timing(diceSpin, {
      toValue: 1,
      duration: 700,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();

    try {
      const total = await buscarRolagem();

      if (nomeCampo) {
        const bonus = valores[nomeCampo] ?? 0;
        setDado(`${nomeCampo}: ${total} + ${bonus} = ${total + bonus}`);
      } else {
        setDado(String(total));
      }
    } catch (erro) {
      console.error(erro);
      setDado("Falha ao rolar o dado");
    } finally {
      rolando.current = false;
    }
  };

  const campoDots = (nomeCampo: string, indice: number) => (
    <View key={nomeCampo} style={characterStyle.traitRow}>
      <Text
        style={characterStyle.traitName}
        numberOfLines={1}
        adjustsFontSizeToFit
        onPress={() => rolarDado(nomeCampo)}
      >
        {nomeCampo}
      </Text>

      <DotRow
        value={valores[nomeCampo] ?? 0}
        onChange={(valor) => definirValor(nomeCampo, valor)}
        animate={criando}
        delay={base + 500 + indice * 40}
      />
    </View>
  );

  const campoNumerico = (
    rotulo: string,
    campo: keyof typeof dados
  ) => (
    <>
      <Text style={characterStyle.statLabel}>{rotulo}</Text>
      <TextInput
        style={characterStyle.statInput}
        keyboardType="numeric"
        placeholderTextColor="#777"
        value={dados[campo]}
        onChangeText={(texto) => alterarDado(campo, texto)}
      />
    </>
  );

  if (carregando) {
    return (
      <View style={styles.container}>
        <Text style={styles.secondaryText}>Carregando personagem...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/canion.png")}
        style={styles.canyon}
        resizeMode="contain"
      />

      <ScrollView
        contentContainerStyle={characterStyle.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <Reveal enabled={criando} delay={base}>
          <Image
            source={require("../../assets/Logo.png")}
            style={characterStyle.logo}
            resizeMode="contain"
          />
        </Reveal>

        <Reveal
          enabled={criando}
          delay={base + 100}
          style={characterStyle.headerRow}
        >
          <View style={characterStyle.nameBox}>
            <Text
              style={characterStyle.nameText}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {nome}
            </Text>
          </View>

          <View style={characterStyle.levelWrapper}>
            <TouchableOpacity
              style={characterStyle.levelBox}
              onPress={() => setNivelAberto((aberto) => !aberto)}
            >
              <Text style={characterStyle.levelText}>Nível {nivel}</Text>
              <Text style={characterStyle.levelArrow}>▼</Text>
            </TouchableOpacity>

            {nivelAberto && (
              <View style={characterStyle.levelList}>
                {NIVEIS.map((item) => (
                  <TouchableOpacity
                    key={item}
                    style={characterStyle.levelItem}
                    onPress={() => {
                      setNivel(item);
                      setNivelAberto(false);
                    }}
                  >
                    <Text style={characterStyle.levelItemText}>
                      Nível {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </Reveal>

        <Text style={characterStyle.sectionTitle}>Atributos</Text>

        <Reveal
          enabled={criando}
          delay={base + 200}
          style={characterStyle.row}
        >
          <View
            style={[
              characterStyle.panel,
              characterStyle.attributesPanel,
            ]}
          >
            {atributos.map(campoDots)}
          </View>

          <View
            style={[characterStyle.panel, characterStyle.statsPanel]}
          >
            {campoNumerico("Vida", "vida")}
            {campoNumerico("Defesa", "defesa")}
            {campoNumerico("Ações", "acoes")}
          </View>

          <View style={characterStyle.sidePanel}>
            <View style={characterStyle.sideBox}>
              <Text style={characterStyle.panelCenterTitle}>
                Tormento
              </Text>
              <TextInput
                style={characterStyle.fieldInput}
                multiline
                placeholderTextColor="#777"
                value={dados.tormento}
                onChangeText={(texto) => alterarDado("tormento", texto)}
              />
            </View>

            <View
              style={[
                characterStyle.sideBox,
                characterStyle.sideBoxSpacing,
              ]}
            >
              <Text style={characterStyle.panelCenterTitle}>
                Recompensa
              </Text>
              <TextInput
                style={characterStyle.fieldInput}
                multiline
                keyboardType="numeric"
                placeholderTextColor="#777"
                value={dados.recompensa}
                onChangeText={(texto) =>
                  alterarDado("recompensa", texto)
                }
              />
            </View>
          </View>
        </Reveal>

        <View style={characterStyle.rowSpaced}>
          <Reveal
            enabled={criando}
            delay={base + 320}
            style={characterStyle.backgroundsPanel}
          >
            <View style={characterStyle.panel}>
              <Text style={characterStyle.panelCenterTitle}>
                Antecedentes
              </Text>
              {antecedentes.map((antecedente, indice) =>
                campoDots(antecedente.nome, indice)
              )}
            </View>
          </Reveal>

          <Reveal
            enabled={criando}
            delay={base + 440}
            style={characterStyle.skillsPanel}
          >
            <View style={[characterStyle.panel, { flex: 1 }]}>
              <Text style={characterStyle.panelTitle}>
                Habilidades
              </Text>
              <TextInput
                style={characterStyle.skillsInput}
                multiline
                placeholderTextColor="#777"
                value={dados.habilidades}
                onChangeText={(texto) =>
                  alterarDado("habilidades", texto)
                }
              />
            </View>
          </Reveal>
        </View>

        <Reveal
          enabled={criando}
          delay={base + 560}
          style={characterStyle.rowSpaced}
        >
          <View style={characterStyle.reputationPanel}>
            <View
              style={[
                characterStyle.innerBox,
                characterStyle.reputationBox,
              ]}
            >
              <Text style={characterStyle.panelTitle}>
                Reputação
              </Text>
              <TextInput
                style={characterStyle.fieldInput}
                multiline
                placeholderTextColor="#777"
                value={dados.reputacao}
                onChangeText={(texto) =>
                  alterarDado("reputacao", texto)
                }
              />
            </View>

            <View
              style={[
                characterStyle.innerBox,
                characterStyle.levelBoxSmall,
              ]}
            >
              <Text style={characterStyle.panelTitle}>U$</Text>
              <TextInput
                style={characterStyle.fieldInput}
                keyboardType="numeric"
                placeholderTextColor="#777"
                value={dados.dinheiro}
                onChangeText={(texto) =>
                  alterarDado("dinheiro", texto)
                }
              />
            </View>
          </View>
        </Reveal>

        {mensagem !== "" && (
          <Text style={styles.secondaryText}>{mensagem}</Text>
        )}

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={salvar}
          disabled={salvando}
        >
          <Text style={styles.primaryButtonText}>
            {salvando ? "Salvando..." : "Salvar e voltar"}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {dado !== null && (
        <View style={characterStyle.diceResult}>
          <Text style={characterStyle.diceResultText}>{dado}</Text>
        </View>
      )}

      <TouchableOpacity
        style={characterStyle.diceButton}
        onPress={() => rolarDado()}
      >
        <Animated.Text
          style={[
            characterStyle.diceIcon,
            {
              transform: [
                {
                  rotate: diceSpin.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "720deg"],
                  }),
                },
              ],
            },
          ]}
        >
          🎲
        </Animated.Text>
      </TouchableOpacity>

      {introVisivel && (
        <Animated.View
          style={[
            characterStyle.creationOverlay,
            { opacity: introOpacity },
          ]}
          pointerEvents="auto"
        >
          <Animated.Text
            style={[
              characterStyle.creationTitle,
              { transform: [{ scale: introScale }] },
            ]}
          >
            Novo{"\n"}Cowboy
          </Animated.Text>

          <Animated.View
            style={[
              characterStyle.creationLine,
              {
                width: introLine.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0%", "60%"],
                }),
              },
            ]}
          />

          <Text style={characterStyle.creationSubtitle}>{nome}</Text>
        </Animated.View>
      )}
    </View>
  );
}
