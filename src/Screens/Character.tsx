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

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../Navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Character">;

const personagem = { nome: "Arthur Morgan" };

const NIVEIS = [1, 2, 3, 4, 5];

const atributos = ["Físico", "Agilidade", "Intelecto", "Coragem"];

const antecedentes = [
  "Natureza",
  "Guerra",
  "Falência",
  "Mecânica",
  "Tiroteio",
  "Pastoreio",
  "Exploração",
  "Saber",
  "Roubo",
  "Trapaça",
  "Luta",
  "Medicina",
];

// Tempo (ms) em que a tela de "criação" fica visível antes de revelar a ficha.
const INTRO_MS = 1700;

export default function Character({ route }: Props) {
  const criando = route.params?.criando ?? false;
  const base = criando ? INTRO_MS : 0;

  const [nivel, setNivel] = useState(1);
  const [nivelAberto, setNivelAberto] = useState(false);
  const [valores, setValores] = useState<Record<string, number>>({});
  const [dado, setDado] = useState<number | null>(null);
  const [introVisivel, setIntroVisivel] = useState(criando);

  const introOpacity = useRef(new Animated.Value(1)).current;
  const introScale = useRef(new Animated.Value(1.8)).current;
  const introLine = useRef(new Animated.Value(0)).current;
  const diceSpin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!criando) {
      return;
    }

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

  const definirValor = (chave: string, valor: number) =>
    setValores((atual) => ({ ...atual, [chave]: valor }));

  const rolarDado = () => {
    diceSpin.setValue(0);
    setDado(null);

    Animated.timing(diceSpin, {
      toValue: 1,
      duration: 700,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => setDado(Math.floor(Math.random() * 6) + 1));
  };

  const campoDots = (nome: string, indice: number) => (
    <View key={nome} style={characterStyle.traitRow}>
      <Text style={characterStyle.traitName} numberOfLines={1} adjustsFontSizeToFit>
        {nome}
      </Text>

      <DotRow
        value={valores[nome] ?? 0}
        onChange={(valor) => definirValor(nome, valor)}
        animate={criando}
        delay={base + 500 + indice * 40}
      ></DotRow>
    </View>
  );

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/canion.png")}
        style={characterStyle.canyon}
        resizeMode="contain"
      ></Image>

      <ScrollView
        contentContainerStyle={characterStyle.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <Reveal enabled={criando} delay={base}>
          <Image
            source={require("../../assets/Logo.png")}
            style={characterStyle.logo}
            resizeMode="contain"
          ></Image>
        </Reveal>

        <Reveal enabled={criando} delay={base + 100} style={characterStyle.headerRow}>
          <View style={characterStyle.nameBox}>
            <Text style={characterStyle.nameText} numberOfLines={1} adjustsFontSizeToFit>
              {personagem.nome}
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
                    <Text style={characterStyle.levelItemText}>Nível {item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </Reveal>

        <Text style={characterStyle.sectionTitle}>Atributos</Text>

        <Reveal enabled={criando} delay={base + 200} style={characterStyle.row}>
          <View style={[characterStyle.panel, characterStyle.attributesPanel]}>
            {atributos.map(campoDots)}
          </View>

          <View style={[characterStyle.panel, characterStyle.statsPanel]}>
            <Text style={characterStyle.statLabel}>Vida</Text>
            <TextInput
              style={characterStyle.statInput}
              keyboardType="numeric"
              placeholderTextColor="#777"
            ></TextInput>

            <Text style={characterStyle.statLabel}>Defesa</Text>
            <TextInput
              style={characterStyle.statInput}
              keyboardType="numeric"
              placeholderTextColor="#777"
            ></TextInput>

            <Text style={characterStyle.statLabel}>Ações</Text>
            <TextInput
              style={characterStyle.statInput}
              keyboardType="numeric"
              placeholderTextColor="#777"
            ></TextInput>
          </View>

          <View style={characterStyle.sidePanel}>
            <View style={characterStyle.sideBox}>
              <Text style={characterStyle.panelCenterTitle}>Tormento</Text>
              <TextInput
                style={characterStyle.fieldInput}
                multiline
                placeholderTextColor="#777"
              ></TextInput>
            </View>

            <View style={[characterStyle.sideBox, characterStyle.sideBoxSpacing]}>
              <Text style={characterStyle.panelCenterTitle}>Recompensa</Text>
              <TextInput
                style={characterStyle.fieldInput}
                multiline
                placeholderTextColor="#777"
              ></TextInput>
            </View>
          </View>
        </Reveal>

        <View style={characterStyle.rowSpaced}>
          <Reveal enabled={criando} delay={base + 320} style={characterStyle.backgroundsPanel}>
            <View style={characterStyle.panel}>
              <Text style={characterStyle.panelCenterTitle}>Antecedentes</Text>
              {antecedentes.map(campoDots)}
            </View>
          </Reveal>

          <Reveal enabled={criando} delay={base + 440} style={characterStyle.skillsPanel}>
            <View style={[characterStyle.panel, { flex: 1 }]}>
              <Text style={characterStyle.panelTitle}>Habilidades</Text>
              <TextInput
                style={characterStyle.skillsInput}
                multiline
                placeholderTextColor="#777"
              ></TextInput>
            </View>
          </Reveal>
        </View>

        <Reveal enabled={criando} delay={base + 560} style={characterStyle.rowSpaced}>
          <View style={characterStyle.reputationPanel}>
            <View style={[characterStyle.innerBox, characterStyle.reputationBox]}>
              <Text style={characterStyle.panelTitle}>Reputação</Text>
              <TextInput
                style={characterStyle.fieldInput}
                multiline
                placeholderTextColor="#777"
              ></TextInput>
            </View>

            <View style={[characterStyle.innerBox, characterStyle.levelBoxSmall]}>
              <Text style={characterStyle.panelTitle}>U$</Text>
              <TextInput
                style={characterStyle.fieldInput}
                multiline
                placeholderTextColor="#777"
              ></TextInput>
            </View>
          </View>
        </Reveal>
      </ScrollView>

      {dado !== null && (
        <View style={characterStyle.diceResult}>
          <Text style={characterStyle.diceResultText}>{dado}</Text>
        </View>
      )}

      <TouchableOpacity style={characterStyle.diceButton} onPress={rolarDado}>
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
          style={[characterStyle.creationOverlay, { opacity: introOpacity }]}
          pointerEvents="auto"
        >
          <Animated.Text
            style={[characterStyle.creationTitle, { transform: [{ scale: introScale }] }]}
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
          ></Animated.View>

          <Text style={characterStyle.creationSubtitle}>{personagem.nome}</Text>
        </Animated.View>
      )}
    </View>
  );
}