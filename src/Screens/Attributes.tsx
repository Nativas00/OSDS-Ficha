import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

import styles from "../style/StylesOverall";
import newCharacterStyle from "../style/NewCharacterStyle";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { PontosAtributos, RootStackParamList } from "../Navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Attributes">;

const atributos = [
  { id: "fisico", nome: "Físico", bonus: "mais vida máxima", cor: newCharacterStyle.optionActive },
  { id: "agilidade", nome: "Agilidade", bonus: "mais ações", cor: newCharacterStyle.optionCard },
  { id: "intelecto", nome: "Intelecto", bonus: "mais pontos de antecedentes", cor: newCharacterStyle.optionActive },
  { id: "coragem", nome: "Coragem", bonus: "mais iniciativa", cor: newCharacterStyle.optionCard },
] as const;

export default function Attributes({ navigation, route }: Props) {
  const [pontos, setPontos] = useState<PontosAtributos>({
    fisico: 0,
    agilidade: 0,
    intelecto: 0,
    coragem: 0,
  });
  const restantes = 4 - pontos.fisico - pontos.agilidade - pontos.intelecto - pontos.coragem;

  function alterarPontos(atributo: keyof PontosAtributos, valor: number) {
    setPontos((atuais) => {
      const total = atuais.fisico + atuais.agilidade + atuais.intelecto + atuais.coragem;
      if (atuais[atributo] + valor < 0 || total + valor > 4) return atuais;
      return { ...atuais, [atributo]: atuais[atributo] + valor };
    });
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={newCharacterStyle.scroll}>
        <Image
          source={require("../../assets/atributos.png")}
          style={newCharacterStyle.titleImage}
          resizeMode="contain"
        ></Image>

        <Text style={newCharacterStyle.paragraph}>
          <Text style={newCharacterStyle.highlight}>ATRIBUTOS</Text> são oque define as características físicas e mentais de um fora da lei, eles aumentam teste de resistencia envolvendo eles em +1 e da mais efeitos alem de dados puramente
        </Text>

        <Text style={newCharacterStyle.paragraph}>
          Distribua 4 pontos entre os <Text style={newCharacterStyle.highlight}>ATRIBUTOS</Text> abaixo. É possível colocar mais de um ponto em cada <Text style={newCharacterStyle.highlight}>ATRIBUTO.</Text>
        </Text>

        <Text style={newCharacterStyle.note}>
          *Mais informações detalhadas no livro de regras O Som das Seis
        </Text>

        <Text style={newCharacterStyle.note}>Pontos restantes: {restantes}</Text>

        {atributos.map((atributo) => (
          <View key={atributo.id} style={newCharacterStyle.optionColumn}>
            <View style={atributo.cor}>
              <TouchableOpacity onPress={() => alterarPontos(atributo.id, -1)} disabled={pontos[atributo.id] === 0}>
                <Text style={newCharacterStyle.optionButton}>-</Text>
              </TouchableOpacity>

              <Text style={newCharacterStyle.optionText}>
                {atributo.nome}: {pontos[atributo.id]}{"\n"}
                {atributo.bonus}
              </Text>

              <TouchableOpacity onPress={() => alterarPontos(atributo.id, 1)} disabled={restantes === 0}>
                <Text style={newCharacterStyle.optionButton}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <Image
        source={require("../../assets/enfeite.png")}
        style={newCharacterStyle.footer}
        resizeMode="cover"
      ></Image>

      <View style={newCharacterStyle.arrowRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={newCharacterStyle.arrowText}>←</Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={restantes !== 0}
          onPress={() => navigation.navigate("Backgrounds", {
            usuario: route.params.usuario,
            atributos: pontos,
          })}
        >
          <Text style={newCharacterStyle.arrowText}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
