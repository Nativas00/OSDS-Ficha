import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

import styles from "../style/StylesOverall";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../Navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const MAX_PERSONAGENS = 5;
const usuario = "*PLACEHOLDER*";
const personagens = [{ id: 1, nome: "Arthur Morgan", nivel: 1 }];

export default function Home({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/canion.png")}
        style={styles.canyon}
        resizeMode="contain"
      ></Image>

      <ScrollView contentContainerStyle={styles.homeScroll}>
        <Image
          source={require("../../assets/Logo.png")}
          style={styles.bannerLogo}
        ></Image>

        <Text style={styles.homeTitle}>Seja bem vindo,{usuario}</Text>

        <Text style={styles.secondaryText}>
          Aqui estão aqueles que são queimados pelo sol escaldante do Oeste
        </Text>

        <View style={styles.buttons}>
          <Text style={styles.secondaryButtonText}>PERSONAGENS ({personagens.length}/{MAX_PERSONAGENS}):</Text>

          {personagens.map((personagem) => (
            <View key={personagem.id} style={styles.gapMedium}>
              <TouchableOpacity style={styles.lightBox}>
                <Text style={styles.primaryButtonText}>{personagem.nome.toUpperCase()}</Text>
                <Text style={styles.primaryButtonText}>Level {personagem.nivel}</Text>
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate("Attributes")}
          >
            <Text style={styles.secondaryButtonText}>Criar novo cowboy +</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() =>
            navigation.reset({ index: 0, routes: [{ name: "FirstScreen" }] })
          }
        >
          <Text style={styles.secondaryText}>Sair da Conta</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
