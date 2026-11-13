import { StyleSheet } from "react-native";

import type { ViewStyle } from "react-native";

export const boxBase: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingVertical: 10,
  paddingHorizontal: 12,
  borderRadius: 12,
  borderWidth: 1.5,
  borderColor: "#FFFFFF",
  elevation: 4,
  shadowColor: "#FFFFFF",
  shadowOpacity: 0.4,
  shadowRadius: 6,
  shadowOffset: { width: 0, height: 0 },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  banner: {
    width: "100%",
    height: 290,
    borderBottomWidth: 3,
    borderBottomColor: "#D9B77E",
  },

  primaryButton: {
    backgroundColor: "#D9B77E",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 30,
  },

  secondaryButton: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
    paddingVertical: 12,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#D9B77E",
  },

  primaryButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1A1208",
  },

  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#D9B77E",
  },

  backButton: {
    position: "absolute",
    top: 40,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  backButtonText: {
    color: "#D9B77E",
    fontSize: 24,
    fontWeight: "bold",
  },

  inputContainer: {
    marginBottom: 14,
  },

  inputLabel: {
    fontSize: 16,
    color: "#000",
    marginBottom: 12,
  },

  input: {
    width: "100%",
    height: 38,
    backgroundColor: "#e2e4e5",
    paddingHorizontal: 10,
    paddingVertical: 2,
    color: "#1A1010",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#403e3e",
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingBottom: 120,
  },

  title: {
    fontSize: 34,
    fontWeight: "bold",
    letterSpacing: 3,
    color: "#D9B77E",
    textTransform: "uppercase",
  },

  divider: {
    width: 56,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#B8935A",
    marginTop: 12,
    marginBottom: 24,
  },

  text: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    color: "#FFFFFF",
  },

  secondaryText: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    color: "#CFCFCF",
    marginTop: 16,
  },

  buttons: {
    width: "100%",
    maxWidth: 280,
    marginTop: 32,
  },

  bannerLogo: {
    height: 82,
    aspectRatio: 783 / 164,
    marginTop: 80,
    alignSelf: "center",
  },

  canyon: {
    position: "absolute",
    right: 0,
    bottom: 0,
    aspectRatio: 268 / 586,
  },

  homeScroll: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },

  homeTitle: {
    marginTop: 26,
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 3,
    color: "#D9B77E",
    textTransform: "uppercase",
  },

  gapSmall: {
    marginTop: 6,
  },

  gapMedium: {
    marginTop: 16,
  },

  lightBox: {
    ...boxBase,
    borderWidth: 0,
    backgroundColor: "#D9D9D9",
  },
});

export default styles;
