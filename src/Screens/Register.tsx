import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import { StatusBar } from "expo-status-bar";

import { cadastrarUsuario } from "../database/usuarios";
import ScreenHeader from "../Components/ScreenHeader";
import FormInput from "../Components/FormInput";
import styles from "../style/StylesOverall";
import accountStyles from "../style/AccountStyles";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../Navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

export default function RegisterScreen({ navigation }: Props) {
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [mensagem, setMensagem] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function criarConta() {
    setMensagem("");
    if (!name.trim() || !user.trim() || !email.trim() || !password || !confirmPassword) {
      setMensagem("Preencha todos os campos.");
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) {
      setMensagem("Digite um e-mail válido.");
      return;
    }
    if (password.length < 8) {
      setMensagem("Use pelo menos oito caracteres na senha.");
      return;
    }
    if (password !== confirmPassword) {
      setMensagem("As senhas precisam ser iguais.");
      return;
    }
    if (!acceptedTerms) {
      setMensagem("Aceite os termos para continuar.");
      return;
    }

    setEnviando(true);
    try {
      if (await cadastrarUsuario(name, user, email, password)) {
        navigation.replace("Login");
      } else {
        setMensagem("Este e-mail ou nome de usuário já está em uso.");
      }
    } catch (erro) {
      console.error(erro);
      setMensagem("Não foi possível criar a conta local.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={accountStyles.registerScroll}
      keyboardShouldPersistTaps="handled"
    >
      <StatusBar style="light"></StatusBar>

      <ScreenHeader></ScreenHeader>

      <View style={accountStyles.content}>
        <Text style={accountStyles.title}>CADASTRO</Text>

        <View style={accountStyles.form}>
          <FormInput
            label="Nome completo"
            value={name}
            onChangeText={setName}
          ></FormInput>

          <FormInput
            label="Nome de usuário"
            value={user}
            onChangeText={setUser}
          ></FormInput>

          <FormInput
            label="E-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          ></FormInput>

          <FormInput
            label="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          ></FormInput>

          <FormInput
            label="Confirmar senha"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          ></FormInput>

          <TouchableOpacity
            style={accountStyles.terms}
            onPress={() => setAcceptedTerms(!acceptedTerms)}
          >
            <View style={accountStyles.checkbox}>
              {acceptedTerms && (
                <Text style={accountStyles.checkmark}>✓</Text>
              )}
            </View>

            <Text style={accountStyles.smallText}>
              Li e aceito os termos de uso
            </Text>
          </TouchableOpacity>

          {mensagem !== "" && <Text style={accountStyles.formText}>{mensagem}</Text>}
          <View style={styles.gapMedium}>
            <TouchableOpacity
              style={accountStyles.formPrimaryButton}
              onPress={criarConta}
              disabled={enviando}
            >
              <Text style={styles.primaryButtonText}>{enviando ? "Criando..." : "Criar conta"}</Text>
            </TouchableOpacity>
          </View>

          <View style={accountStyles.links}>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={accountStyles.smallText}>Já possui uma conta?</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={accountStyles.smallText}>Entrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
