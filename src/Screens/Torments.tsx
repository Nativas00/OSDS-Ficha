import React, { useState } from "react";
import { sortearTormento } from "../database/personagens";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

import styles from "../style/StylesOverall";
import newCharacterStyle from "../style/NewCharacterStyle";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../Navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Torments">;

export default function Torments({ navigation, route }: Props) {
  const [tormento, setTormento] = useState("");
  const [tormentoId, setTormentoId] = useState<number | null>(null);
  const [mensagem, setMensagem] = useState("");
  const [sorteando, setSorteando] = useState(false);

  async function sortear() {
    setSorteando(true);
    setMensagem("");
    try {
      const sorteado = await sortearTormento();
      if (sorteado) {
        setTormento(sorteado.descricao);
        setTormentoId(sorteado.id);
      } else {
        setMensagem("O catálogo está vazio. Escreva um tormento para continuar.");
      }
    } catch {
      setMensagem("Não foi possível sortear um tormento.");
    } finally {
      setSorteando(false);
    }
  }

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
              value={tormento}
              editable={!sorteando}
              onChangeText={(texto) => {
                setTormento(texto);
                setTormentoId(null);
                setMensagem("");
              }}
              placeholderTextColor="#777"
            ></TextInput>
          </View>
        </View>

        <Text style={newCharacterStyle.separator}>OU</Text>

        <View style={newCharacterStyle.centerBox}>
          <TouchableOpacity style={styles.lightBox} onPress={sortear} disabled={sorteando}>
            <Text style={newCharacterStyle.lightText}>Role os Dados aqui</Text>
            <Text style={newCharacterStyle.boxIcon}>🎲</Text>
          </TouchableOpacity>
        </View>
        {mensagem !== "" && <Text style={newCharacterStyle.note}>{mensagem}</Text>}
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

        <TouchableOpacity disabled={sorteando || !tormento.trim()}
          onPress={() => navigation.navigate("Skills", { ...route.params, tormento: tormento.trim(), tormentoId })}>
          <Text style={newCharacterStyle.arrowText}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
