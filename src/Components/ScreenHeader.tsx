import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import styles from "../style/StylesOverall";

export default function ScreenHeader() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/banner.png")}
        style={styles.banner}
        resizeMode="cover"
      ></Image>

      {navigation.canGoBack() && (
        <TouchableOpacity
          style={[styles.backButton, { top: insets.top + 8 }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
