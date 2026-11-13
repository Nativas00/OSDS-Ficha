import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

import styles from "../style/StylesOverall";
import newCharacterStyle from "../style/NewCharacterStyle";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../Navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Backgrounds">;

const antecedentes = [
  { id: 1, nome: "Combate", pontos: 1, cor: newCharacterStyle.optionSpecial },
  { id: 2, nome: "Labuta", pontos: 0, cor: newCharacterStyle.optionActive },
  { id: 3, nome: "Negócios", pontos: 0, cor: newCharacterStyle.optionActive },
  { id: 4, nome: "Montaria", pontos: 0, cor: newCharacterStyle.optionCard },
  { id: 5, nome: "Exploração", pontos: 0, cor: newCharacterStyle.optionCard },
  { id: 6, nome: "Medicina", pontos: 0, cor: newCharacterStyle.optionActive },
  { id: 7, nome: "Tradição", pontos: 0, cor: newCharacterStyle.optionActive },
  { id: 8, nome: "Roubo", pontos: 0, cor: newCharacterStyle.optionCard },
];

export default function Backgrounds({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={newCharacterStyle.scroll}>
        <Image
          source={require("../../assets/antecedentes.png")}
          style={newCharacterStyle.titleImage}
          resizeMode="contain"
        ></Image>

        <Text style={newCharacterStyle.paragraph}>
          <Text style={newCharacterStyle.highlight}>ANTECEDENTES</Text> são as perícias desse sistema, com eles definidos você consegue definir o papel e a historia do seu personagem, eles dão +1 nos testes envolvendo a pericia
        </Text>

        <Text style={newCharacterStyle.paragraph}>
          Distribua 4 pontos entre os <Text style={newCharacterStyle.highlight}>ANTECEDENTES</Text> abaixo. É possível colocar mais de um ponto em cada <Text style={newCharacterStyle.highlight}>ANTECEDENTE</Text> com o máximo de 2 no primeiro nível.
        </Text>

        <Text style={newCharacterStyle.note}>
          *É altamente Recomendado colocar pelo menos 1 ponto em combate, se não seu personagem será inútil durante cenas de luta/tiroteio
        </Text>

        <View style={newCharacterStyle.optionGrid}>
          {antecedentes.map((antecedente) => (
            <View key={antecedente.id} style={newCharacterStyle.optionHalf}>
              <View style={antecedente.cor}>
                <TouchableOpacity>
                  <Text style={newCharacterStyle.optionButton}>-</Text>
                </TouchableOpacity>

                <Text style={newCharacterStyle.optionText} numberOfLines={1} adjustsFontSizeToFit>
                  {antecedente.nome}: {antecedente.pontos}
                </Text>

                <TouchableOpacity>
                  <Text style={newCharacterStyle.optionButton}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
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

        <TouchableOpacity onPress={() => navigation.navigate("Torments")}>
          <Text style={newCharacterStyle.arrowText}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
