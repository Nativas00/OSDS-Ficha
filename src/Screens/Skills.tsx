import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

import styles from "../style/StylesOverall";
import newCharacterStyle from "../style/NewCharacterStyle";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../Navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Skills">;

const escolhas = [1, 2];

export default function Skills({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={newCharacterStyle.scroll}>
        <Image
          source={require("../../assets/habilidades.png")}
          style={newCharacterStyle.titleImage}
          resizeMode="contain"
        ></Image>

        <Text style={newCharacterStyle.paragraph}>
          Oque te destaca, oque te torna diferente de um mero Patife e um Xerife corrupto são suas <Text style={newCharacterStyle.highlight}>HABILIDADES</Text>
        </Text>

        <View style={newCharacterStyle.highlightBox}>
          <Text style={newCharacterStyle.bigText}>
            Escolha{"\n"}
            <Text style={newCharacterStyle.highlight}>DUAS HABILIDADES</Text>{"\n"}
            No primeiro nivel
          </Text>
        </View>

        <Text style={newCharacterStyle.note}>
          *Para que consiga saber oque cada habilidade faz, Abra o seu livro de regras do o Som das Seis
        </Text>

        {escolhas.map((escolha) => (
          <View key={escolha} style={newCharacterStyle.centerBox}>
            <TouchableOpacity style={styles.lightBox}>
              <Text style={newCharacterStyle.lightText} numberOfLines={1} adjustsFontSizeToFit>
                ESCOLHA UMA HABILIDADE
              </Text>
              <Text style={newCharacterStyle.boxIcon}>▼</Text>
            </TouchableOpacity>
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

        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Text style={newCharacterStyle.arrowText}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
