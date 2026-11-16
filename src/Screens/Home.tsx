import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

import {
  listarPersonagens,
  type PersonagemResumido,
} from "../database/personagens";
import { encerrarSessao } from "../database/usuarios";
import styles from "../style/StylesOverall";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../Navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const MAX_PERSONAGENS = 5;
export default function Home({ navigation, route }: Props) {
  const { usuario } = route.params;
  const [personagens, setPersonagens] = useState<PersonagemResumido[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [mensagem, setMensagem] = useState("");

  useFocusEffect(
    useCallback(() => {
      let ativa = true;
      setCarregando(true);
      setMensagem("");
      listarPersonagens(usuario.id)
        .then((lista) => {
          if (ativa) setPersonagens(lista);
        })
        .catch((erro) => {
          console.error(erro);
          if (ativa) setMensagem("Não foi possível carregar as fichas.");
        })
        .finally(() => {
          if (ativa) setCarregando(false);
        });

      return () => {
        ativa = false;
      };
    }, [usuario.id]),
  );

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

        <Text style={styles.homeTitle}>Seja bem-vindo, {usuario.nome}</Text>

        <Text style={styles.secondaryText}>
          Aqui estão aqueles que são queimados pelo sol escaldante do Oeste
        </Text>

        <View style={styles.buttons}>
          <Text style={styles.secondaryButtonText}>
            PERSONAGENS ({personagens.length}/{MAX_PERSONAGENS}):
          </Text>

          {carregando && (
            <Text style={styles.secondaryText}>Carregando fichas...</Text>
          )}
          {mensagem !== "" && (
            <Text style={styles.secondaryText}>{mensagem}</Text>
          )}

          {personagens.map((personagem) => (
            <View key={personagem.id} style={styles.gapMedium}>
              <TouchableOpacity
                style={styles.lightBox}
                onPress={() =>
                  navigation.navigate("Character", {
                    personagemId: personagem.id,
                    usuario,
                  })
                }
              >
                <Text style={styles.primaryButtonText}>
                  {personagem.nome.toUpperCase()}
                </Text>
                <Text style={styles.primaryButtonText}>
                  Level {personagem.nivel}
                </Text>
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity
            style={styles.secondaryButton}
            disabled={
              carregando ||
              mensagem !== "" ||
              personagens.length >= MAX_PERSONAGENS
            }
            onPress={() => navigation.navigate("Attributes", { usuario })}
          >
            <Text style={styles.secondaryButtonText}>Criar novo cowboy +</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => {
            void encerrarSessao().catch(() => {});
            navigation.reset({ index: 0, routes: [{ name: "FirstScreen" }] });
          }}
        >
          <Text style={styles.secondaryText}>Sair da Conta</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
