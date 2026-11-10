import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

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

  return (
    <View style={styles.container}>
      <ScreenHeader></ScreenHeader>

      <View style={[accountStyles.content, accountStyles.loginContent]}>
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

          <TouchableOpacity
            style={[styles.primaryButton, accountStyles.formPrimaryButton]}
          >
            <Text
              style={[styles.primaryButtonText, accountStyles.formButtonText]}
            >
              Iniciar Sessão
            </Text>
          </TouchableOpacity>

          <Text style={[accountStyles.formText, accountStyles.separator]}>
            Ou
          </Text>

          <TouchableOpacity
            style={[styles.secondaryButton, accountStyles.formSecondaryButton]}
            onPress={() => navigation.navigate("Register")}
          >
            <Text
              style={[styles.secondaryButtonText, accountStyles.formButtonText]}
            >
              Criar uma conta
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={accountStyles.forgotButton}>
            <Text style={accountStyles.formText}>Esqueci minha senha</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
