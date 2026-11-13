import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import styles from "../style/StylesOverall";

export default function ScreenHeader() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/banner.png")}
        style={styles.banner}
        resizeMode="cover"
      ></Image>

      {navigation.canGoBack() && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
