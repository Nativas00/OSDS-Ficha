import React from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

import styles from "../style/StylesOverall";
import newCharacterStyle from "../style/NewCharacterStyle";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../Navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Torments">;

export default function Torments({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={newCharacterStyle.scroll}>
        <Image
          source={require("../../assets/tormentos.png")}
          style={newCharacterStyle.titleImage}
          resizeMode="contain"
        ></Image>

        <Text style={newCharacterStyle.paragraph}>
          Oque aflige uma pessoa que já não tem mais medo de se jogar a frente de uma bala por um duelo, um <Text style={newCharacterStyle.highlight}>TORMENTO</Text> que a persegue
        </Text>

        <Text style={newCharacterStyle.paragraph}>
          Escreva a baixo um <Text style={newCharacterStyle.highlight}>TORMENTO</Text> escolhido do seu personagem ou role os dados abaixo para que seja definido por sorte{"\n"}
          A visão da juiza (mestre), se o <Text style={newCharacterStyle.highlight}>TORMENTO</Text> for apresentado pelo personagem de forma interessante para a narrativa, o jogador recebe uma carta de sina para utilizar em futuros duelos
        </Text>

        <View style={newCharacterStyle.centerBox}>
          <View style={styles.lightBox}>
            <TextInput
              style={newCharacterStyle.lightText}
              placeholder="Defina o seu Tormento"
              placeholderTextColor="#777"
            ></TextInput>
          </View>
        </View>

        <Text style={newCharacterStyle.separator}>OU</Text>

        <View style={newCharacterStyle.centerBox}>
          <TouchableOpacity style={styles.lightBox}>
            <Text style={newCharacterStyle.lightText}>Role os Dados aqui</Text>
            <Text style={newCharacterStyle.boxIcon}>🎲</Text>
          </TouchableOpacity>
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

        <TouchableOpacity onPress={() => navigation.navigate("Skills")}>
          <Text style={newCharacterStyle.arrowText}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
