import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { conferirLogin } from "../database/usuarios";
import ScreenHeader from "../Components/ScreenHeader";
import FormInput from "../Components/FormInput";
import styles from "../style/StylesOverall";
import accountStyles from "../style/AccountStyles";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../Navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [mensagem, setMensagem] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function entrar() {
    setMensagem("");
    if (!email.trim() || !senha) {
      setMensagem("Preencha o e-mail e a senha.");
      return;
    }

    setEnviando(true);
    try {
      const usuario = await conferirLogin(email, senha);
      if (usuario) {
        navigation.reset({ index: 0, routes: [{ name: "Home", params: { usuario } }] });
      } else {
        setMensagem("E-mail ou senha incorretos.");
      }
    } catch (erro) {
      console.error(erro);
      setMensagem("Não foi possível acessar as contas locais.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <View style={styles.container}>
      <ScreenHeader></ScreenHeader>

      <View style={accountStyles.content}>
        <View style={accountStyles.loginContent}>
          <Text style={accountStyles.title}>LOGIN</Text>

          <View style={accountStyles.form}>
            <FormInput
              label="Endereço de e-mail"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            ></FormInput>

            <FormInput
              label="Senha"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry
            ></FormInput>

            {mensagem !== "" && <Text style={accountStyles.formText}>{mensagem}</Text>}
            <View style={styles.gapSmall}>
              <TouchableOpacity
                style={accountStyles.formPrimaryButton}
                onPress={entrar}
                disabled={enviando}
              >
                <Text style={styles.primaryButtonText}>{enviando ? "Entrando..." : "Iniciar Sessão"}</Text>
              </TouchableOpacity>
            </View>

            <Text style={accountStyles.formText}>Ou</Text>

            <TouchableOpacity
              style={accountStyles.formSecondaryButton}
              onPress={() => navigation.navigate("Register")}
            >
              <Text style={styles.secondaryButtonText}>Criar uma conta</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={accountStyles.formText}>Esqueci minha senha</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
