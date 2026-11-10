import React from "react";
import { Text, TextInput, View } from "react-native";

import styles from "../style/StylesOverall";

interface FormInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address";
}

export default function FormInput({
  label,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
}: FormInputProps) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize="none"
      ></TextInput>
    </View>
  );
}
