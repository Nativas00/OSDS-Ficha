import React, { useEffect, useState } from "react";
import { listarHabilidades } from "../database/personagens";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

import styles from "../style/StylesOverall";
import newCharacterStyle from "../style/NewCharacterStyle";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../Navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Skills">;

export default function Skills({ navigation, route }: Props) {
  const [habilidades, setHabilidades] = useState<{ id: number; nome: string; descricao: string | null }[] | null>(null);
  const [descricaoAberta, setDescricaoAberta] = useState<number | null>(null);
  const [escolhas, setEscolhas] = useState<number[]>([]);
  const [mensagem, setMensagem] = useState("Carregando habilidades...");

  useEffect(() => {
    let ativa = true;
    listarHabilidades().then((lista) => {
      if (ativa) {
        setHabilidades(lista);
        setMensagem(lista.length < 2 ? "São necessárias duas habilidades no catálogo para continuar." : "");
      }
    }).catch(() => {
      if (ativa) setMensagem("Não foi possível carregar as habilidades.");
    });
    return () => { ativa = false; };
  }, []);

  function selecionar(id: number) {
    setEscolhas((atuais) => {
      if (atuais.includes(id)) return atuais.filter((escolha) => escolha !== id);
      if (atuais.length === 2) return atuais;
      return [...atuais, id];
    });
  }

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
          Toque no nome para escolher e no ícone de informação para ver o efeito.
        </Text>

        {mensagem !== "" && <Text style={newCharacterStyle.note}>{mensagem}</Text>}
        {habilidades?.map((habilidade) => (
          <View key={habilidade.id} style={newCharacterStyle.centerBox}>
            <View style={styles.lightBox}>
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => selecionar(habilidade.id)}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: escolhas.includes(habilidade.id) }}
              >
                <Text style={newCharacterStyle.lightText}>
                  {escolhas.includes(habilidade.id) ? "✓ " : ""}{habilidade.nome}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel={`Descrição de ${habilidade.nome}`}
                accessibilityState={{ expanded: descricaoAberta === habilidade.id }}
                hitSlop={8}
                onPress={() => setDescricaoAberta((atual) => atual === habilidade.id ? null : habilidade.id)}
              >
                <Text style={newCharacterStyle.boxIcon}>ⓘ</Text>
              </TouchableOpacity>
            </View>
            {descricaoAberta === habilidade.id && (
              <Text style={newCharacterStyle.note}>{habilidade.descricao ?? "Descrição indisponível."}</Text>
            )}
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

        <TouchableOpacity disabled={escolhas.length !== 2}
          onPress={() => navigation.navigate("Profile", { ...route.params, habilidades: escolhas })}>
          <Text style={newCharacterStyle.arrowText}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
