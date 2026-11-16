import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import {
  verificarEmail,
  atualizarSenhaPorEmail,
} from "../database/usuarios";

import ScreenHeader from "../Components/ScreenHeader";
import FormInput from "../Components/FormInput";
import styles from "../style/StylesOverall";
import accountStyles from "../style/AccountStyles";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../Navigation/types";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "ForgotPassword"
>;

export default function ForgotPasswordScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [codigoGerado, setCodigoGerado] = useState("");
  const [emailDoCodigo, setEmailDoCodigo] = useState("");
  const [expiraEm, setExpiraEm] = useState<number | null>(null);

  const [mensagem, setMensagem] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function enviarCodigo() {
    setMensagem("");

    const emailLimpo = email.trim().toLowerCase();

    if (!emailLimpo) {
      setMensagem("Digite seu endereço de e-mail.");
      return;
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(emailLimpo)) {
      setMensagem("Digite um e-mail válido.");
      return;
    }

    setEnviando(true);

    try {
      const existe = await verificarEmail(emailLimpo);

      if (!existe) {
        setMensagem("Não encontramos uma conta com esse e-mail.");
        return;
      }

      // Código de seis dígitos para simulação.
      const novoCodigo = Math.floor(
        100000 + Math.random() * 900000
      ).toString();

      setCodigoGerado(novoCodigo);
      setEmailDoCodigo(emailLimpo);
      setExpiraEm(Date.now() + 5 * 60 * 1000);

      setCodigo("");
      setMensagem("Código gerado! Confira a mensagem de simulação.");

      Alert.alert(
        "Código de recuperação",
        `Seu código de simulação é: ${novoCodigo}\n\nEle expira em 5 minutos.`
      );
    } catch (erro) {
      console.error(erro);
      setMensagem("Não foi possível gerar o código.");
    } finally {
      setEnviando(false);
    }
  }

  async function redefinirSenha() {
    setMensagem("");

    const emailLimpo = email.trim().toLowerCase();

    if (!codigo || !novaSenha || !confirmarSenha) {
      setMensagem("Preencha o código e os campos de senha.");
      return;
    }

    if (!codigoGerado || emailLimpo !== emailDoCodigo) {
      setMensagem("Solicite um novo código para esse e-mail.");
      return;
    }

    if (Date.now() > (expiraEm ?? 0)) {
      setCodigoGerado("");
      setExpiraEm(null);
      setMensagem("O código expirou. Solicite outro código.");
      return;
    }

    if (codigo.trim() !== codigoGerado) {
      setMensagem("Código incorreto.");
      return;
    }

    if (novaSenha.length < 8) {
      setMensagem("A nova senha precisa ter pelo menos oito caracteres.");
      return;
    }

    if (novaSenha !== confirmarSenha) {
      setMensagem("As senhas não são iguais.");
      return;
    }

    setEnviando(true);

    try {
      const atualizado = await atualizarSenhaPorEmail(
        emailLimpo,
        novaSenha
      );

      if (atualizado) {
        setCodigoGerado("");
        setCodigo("");
        setNovaSenha("");
        setConfirmarSenha("");

        Alert.alert(
          "Senha alterada!",
          "Sua senha foi redefinida com sucesso. Agora você pode entrar na sua conta.",
          [
            {
              text: "Ir para Login",
              onPress: () => navigation.replace("Login"),
            },
          ]
        );
      } else {
        setMensagem("Não foi possível atualizar a senha.");
      }
    } catch (erro) {
      console.error(erro);
      setMensagem("Ocorreu um erro ao redefinir sua senha.");
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
      <StatusBar style="light" />

      <ScreenHeader />

      <View style={accountStyles.content}>
        <Text style={accountStyles.title}>
          RECUPERAR SENHA
        </Text>

        <View style={accountStyles.form}>
          <FormInput
            label="Digite seu e-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <View style={styles.gapSmall}>
            <TouchableOpacity
              style={accountStyles.formPrimaryButton}
              onPress={enviarCodigo}
              disabled={enviando}
            >
              <Text style={styles.primaryButtonText}>
                {enviando ? "Gerando código..." : "Enviar código"}
              </Text>
            </TouchableOpacity>
          </View>

          <FormInput
            label="Inserir código"
            value={codigo}
            onChangeText={setCodigo}
            keyboardType="numeric"
          />

          <FormInput
            label="Criar nova senha"
            value={novaSenha}
            onChangeText={setNovaSenha}
            secureTextEntry
          />

          <FormInput
            label="Confirmar nova senha"
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            secureTextEntry
          />

          {mensagem !== "" && (
            <Text style={accountStyles.formText}>
              {mensagem}
            </Text>
          )}

          <View style={styles.gapSmall}>
            <TouchableOpacity
              style={accountStyles.formPrimaryButton}
              onPress={redefinirSenha}
              disabled={enviando}
            >
              <Text style={styles.primaryButtonText}>
                {enviando ? "Aguarde..." : "Redefinir senha"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.gapSmall}>
            <TouchableOpacity
              style={accountStyles.formSecondaryButton}
              onPress={() => navigation.replace("Login")}
            >
              <Text style={styles.secondaryButtonText}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}