import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import { StatusBar } from "expo-status-bar";

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

          <View style={styles.gapMedium}>
            <TouchableOpacity
              style={accountStyles.formPrimaryButton}
              onPress={() =>
                navigation.reset({ index: 0, routes: [{ name: "Home" }] })
              }
            >
              <Text style={styles.primaryButtonText}>Criar conta</Text>
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
