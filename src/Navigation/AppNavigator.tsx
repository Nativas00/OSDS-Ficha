import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import First from "../Screens/FirstScreen";
import Login from "../Screens/Login";
import Register from "../Screens/Register";
import Home from "../Screens/Home";
import Attributes from "../Screens/Attributes";
import Backgrounds from "../Screens/Backgrounds";
import Torments from "../Screens/Torments";
import Skills from "../Screens/Skills";
import Profile from "../Screens/Profile";

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
      <Stack.Screen name="FirstScreen" component={First}></Stack.Screen>
      <Stack.Screen name="Login" component={Login}></Stack.Screen>
      <Stack.Screen name="Register" component={Register}></Stack.Screen>
      <Stack.Screen name="Home" component={Home}></Stack.Screen>
      <Stack.Screen name="Attributes" component={Attributes}></Stack.Screen>
      <Stack.Screen name="Backgrounds" component={Backgrounds}></Stack.Screen>
      <Stack.Screen name="Torments" component={Torments}></Stack.Screen>
      <Stack.Screen name="Skills" component={Skills}></Stack.Screen>
      <Stack.Screen name="Profile" component={Profile}></Stack.Screen>
    </Stack.Navigator>
  );
}
