import React, { useEffect, useState } from "react";
import { listarAntecedentes } from "../database/personagens";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

import styles from "../style/StylesOverall";
import newCharacterStyle from "../style/NewCharacterStyle";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../Navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Backgrounds">;

export default function Backgrounds({ navigation, route }: Props) {
  const [antecedentes, setAntecedentes] = useState<{ id: number; nome: string }[]>([]);
  const [pontos, setPontos] = useState<Record<number, number>>({});
  const [mensagem, setMensagem] = useState("Carregando antecedentes...");
  const totalPontos = 4 + route.params.atributos.intelecto;
  const restantes = totalPontos - Object.values(pontos).reduce((total, valor) => total + valor, 0);

  useEffect(() => {
    let ativa = true;
    listarAntecedentes().then((lista) => {
      if (ativa) {
        setAntecedentes(lista);
        setMensagem(lista.length ? "" : "Nenhum antecedente disponível.");
      }
    }).catch(() => {
      if (ativa) setMensagem("Não foi possível carregar os antecedentes.");
    });
    return () => { ativa = false; };
  }, []);

  function alterarPontos(id: number, valor: number) {
    setPontos((atuais) => {
      const novoValor = (atuais[id] ?? 0) + valor;
      const total = Object.values(atuais).reduce((soma, pontos) => soma + pontos, 0);
      if (novoValor < 0 || novoValor > 2 || total + valor > totalPontos) return atuais;
      return { ...atuais, [id]: novoValor };
    });
  }

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
          Distribua {totalPontos} pontos entre os <Text style={newCharacterStyle.highlight}>ANTECEDENTES</Text> abaixo. É possível colocar mais de um ponto em cada <Text style={newCharacterStyle.highlight}>ANTECEDENTE</Text> com o máximo de 2 no primeiro nível.
        </Text>

        <Text style={newCharacterStyle.note}>
          *É altamente Recomendado colocar pelo menos 1 ponto em combate, se não seu personagem será inútil durante cenas de luta/tiroteio
        </Text>

        <Text style={newCharacterStyle.note}>Pontos restantes: {restantes}</Text>
        {mensagem !== "" && <Text style={newCharacterStyle.note}>{mensagem}</Text>}
        <View style={newCharacterStyle.optionGrid}>
          {antecedentes.map((antecedente) => (
            <View key={antecedente.id} style={newCharacterStyle.optionHalf}>
              <View style={(pontos[antecedente.id] ?? 0) > 0 ? newCharacterStyle.optionActive : newCharacterStyle.optionCard}>
                <TouchableOpacity onPress={() => alterarPontos(antecedente.id, -1)}>
                  <Text style={newCharacterStyle.optionButton}>-</Text>
                </TouchableOpacity>

                <Text style={newCharacterStyle.optionText} numberOfLines={1} adjustsFontSizeToFit>
                  {antecedente.nome}: {pontos[antecedente.id] ?? 0}
                </Text>

                <TouchableOpacity onPress={() => alterarPontos(antecedente.id, 1)}>
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

        <TouchableOpacity disabled={restantes !== 0} onPress={() => navigation.navigate("Torments", { ...route.params, antecedentes: pontos })}>
          <Text style={newCharacterStyle.arrowText}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
