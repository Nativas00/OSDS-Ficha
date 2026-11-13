import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

import styles from "../style/StylesOverall";
import newCharacterStyle from "../style/NewCharacterStyle";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../Navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Attributes">;

const atributos = [
  { id: 1, nome: "Físico", bonus: "mais vida máxima", cor: newCharacterStyle.optionActive },
  { id: 2, nome: "Agilidade", bonus: "mais ações", cor: newCharacterStyle.optionCard },
  { id: 3, nome: "Intelecto", bonus: "mais antecedentes", cor: newCharacterStyle.optionActive },
  { id: 4, nome: "Coragem", bonus: "mais iniciativa", cor: newCharacterStyle.optionCard },
];

export default function Attributes({ navigation }: Props) {
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

        {atributos.map((atributo) => (
          <View key={atributo.id} style={newCharacterStyle.optionColumn}>
            <View style={atributo.cor}>
              <TouchableOpacity>
                <Text style={newCharacterStyle.optionButton}>-</Text>
              </TouchableOpacity>

              <Text style={newCharacterStyle.optionText}>
                {atributo.nome}: 0{"\n"}
                {atributo.bonus}
              </Text>

              <TouchableOpacity>
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

        <TouchableOpacity onPress={() => navigation.navigate("Backgrounds")}>
          <Text style={newCharacterStyle.arrowText}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
