import React from "react";
import { StatusBar } from "expo-status-bar";
import { Image, Text, TouchableOpacity, View } from "react-native";

import styles from "../style/StylesOverall";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../Navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "FirstScreen">;

export default function FirstScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <StatusBar style="light"></StatusBar>

      <Image
        source={require("../../assets/banner.png")}
        style={styles.banner}
      ></Image>

      <View style={styles.content}>
        <Text style={styles.title}>Ficha Digital</Text>
        <View style={styles.divider}></View>

        <Text style={styles.text}>
          O Som das Seis é um RPG brasileiro de faroeste, com cowboys, duelos e
          aventuras em uma terra sem lei.
        </Text>

        <Text style={styles.secondaryText}>
          Crie uma conta agora mesmo para poder criar a sua própria ficha, ou
          entre caso já possua uma.
        </Text>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.primaryButtonText}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.secondaryButtonText}>Criar Conta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
