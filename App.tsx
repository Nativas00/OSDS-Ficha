import React, { useEffect } from "react";
import { AppState, Platform } from "react-native";
import { NavigationContainer, createNavigationContainerRef } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import AppNavigator from "./src/Navigation/AppNavigator";
import { agendarLembrete, cancelarLembrete, pedirPermissao } from "./src/Notifications/lembrete";

import type { RootStackParamList } from "./src/Navigation/types";

const navegacao = createNavigationContainerRef<RootStackParamList>();
const telasDeCriacao = ["Attributes", "Backgrounds", "Torments", "Skills", "Profile"];

export default function App() {
  useEffect(() => {
    if (Platform.OS === "web") return;

    pedirPermissao().catch(console.error);

    const sub = AppState.addEventListener("change", (estado) => {
      const tela = navegacao.isReady() ? navegacao.getCurrentRoute()?.name ?? "" : "";

      if (estado === "background" && telasDeCriacao.includes(tela)) {
        agendarLembrete().catch(console.error);
      }

      if (estado === "active") {
        cancelarLembrete().catch(console.error);
      }
    });

    return () => sub.remove();
  }, []);

  return (
    <NavigationContainer ref={navegacao}>
      <StatusBar style="light"></StatusBar>
      <AppNavigator></AppNavigator>
    </NavigationContainer>
  );
}
