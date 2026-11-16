import React, { useRef, useState } from "react";
import { salvarPersonagem } from "../database/personagens";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

import styles from "../style/StylesOverall";
import newCharacterStyle from "../style/NewCharacterStyle";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../Navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

const campos = [
  { id: "nome", rotulo: "NOME:", dica: "Defina o seu Nome" },
  { id: "passado", rotulo: "PASSADO:", dica: "Defina o seu Passado" },
  { id: "aparencia", rotulo: "APARENCIA:", dica: "Defina o sua Aparencia" },
  { id: "objetivos", rotulo: "OBJETIVOS:", dica: "Defina o seu Objetivos" },
] as const;

export default function Profile({ navigation, route }: Props) {
  const [perfil, setPerfil] = useState({ nome: "", passado: "", aparencia: "", objetivos: "" });
  const [mensagem, setMensagem] = useState("");
  const [salvando, setSalvando] = useState(false);
  const envioEmAndamento = useRef(false);

  async function concluir() {
    if (envioEmAndamento.current) return;
    if (!perfil.nome.trim()) {
      setMensagem("Digite o nome do personagem.");
      return;
    }

    envioEmAndamento.current = true;
    setSalvando(true);
    setMensagem("");
    try {
      await salvarPersonagem(route.params, perfil);
      navigation.popTo("Home", { usuario: route.params.usuario });
    } catch (erro) {
      console.error(erro);
      setMensagem(String(erro).includes("Limite de cinco personagens")
        ? "Você já tem cinco personagens."
        : "Não foi possível salvar a ficha.");
    } finally {
      envioEmAndamento.current = false;
      setSalvando(false);
    }
  }

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
                  value={perfil[campo.id]}
                  editable={!salvando}
                  onChangeText={(texto) => setPerfil((atual) => ({ ...atual, [campo.id]: texto }))}
                  placeholderTextColor="#777"
                ></TextInput>
              </View>
            </View>
          </View>
        ))}

        {mensagem !== "" && <Text style={newCharacterStyle.note}>{mensagem}</Text>}
        <View style={newCharacterStyle.centerBox}>
          <TouchableOpacity style={styles.primaryButton} onPress={concluir} disabled={salvando}>
            <Text style={styles.primaryButtonText}>{salvando ? "Salvando..." : "Concluir"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Image
        source={require("../../assets/enfeite.png")}
        style={newCharacterStyle.footer}
        resizeMode="cover"
      ></Image>

      <View style={newCharacterStyle.arrowRow}>
        <TouchableOpacity disabled={salvando} onPress={() => navigation.goBack()}>
          <Text style={newCharacterStyle.arrowText}>←</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
