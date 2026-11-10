import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FirstScreen from "../Screens/FirstScreen";
import LoginScreen from "../Screens/Login";
import RegisterScreen from "../Screens/Register";

import type { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="FirstScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="FirstScreen" component={FirstScreen}></Stack.Screen>
      <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
      <Stack.Screen name="Register" component={RegisterScreen}></Stack.Screen>
    </Stack.Navigator>
  );
}
