import React from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

import styles from "../style/StylesOverall";
import newCharacterStyle from "../style/NewCharacterStyle";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../Navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

const campos = [
  { id: 1, rotulo: "NOME:", dica: "Defina o seu Nome" },
  { id: 2, rotulo: "PASSADO:", dica: "Defina o seu Passado" },
  { id: 3, rotulo: "APARENCIA:", dica: "Defina o sua Aparencia" },
  { id: 4, rotulo: "OBJETIVOS:", dica: "Defina o seu Objetivos" },
];

export default function Profile({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={newCharacterStyle.scroll}>
        <Image
          source={require("../../assets/perfil.png")}
          style={newCharacterStyle.titleImage}
          resizeMode="contain"
        ></Image>

        <Text style={newCharacterStyle.paragraph}>
          Todo sem nome ja teve um nome, todo sem futuro ja teve seu passado, eles podem tentar fugir, mas seu <Text style={newCharacterStyle.highlight}>PERFIL</Text> sempre irá os seguir
        </Text>

        {campos.map((campo) => (
          <View key={campo.id} style={styles.gapMedium}>
            <Text style={styles.secondaryButtonText}>{campo.rotulo}</Text>

            <View style={styles.gapSmall}>
              <View style={styles.lightBox}>
                <TextInput
                  style={newCharacterStyle.lightText}
                  placeholder={campo.dica}
                  placeholderTextColor="#777"
                ></TextInput>
              </View>
            </View>
          </View>
        ))}

        <View style={newCharacterStyle.centerBox}>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Concluir</Text>
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
      </View>
    </View>
  );
}
