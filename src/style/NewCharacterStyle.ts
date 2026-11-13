import { StyleSheet } from "react-native";

import { boxBase } from "./StylesOverall";

const newCharacterStyle = StyleSheet.create({
  scroll: {
    paddingHorizontal: 24,
    paddingTop: 44,
    paddingBottom: 150,
  },

  titleImage: {
    height: 100,
    aspectRatio: 966 / 258,
    alignSelf: "center",
  },

  paragraph: {
    marginTop: 18,
    fontSize: 15,
    lineHeight: 23,
    textAlign: "center",
    color: "#D9B77E",
  },

  highlight: {
    color: "#E03131",
    fontWeight: "bold",
  },

  note: {
    marginTop: 10,
    fontSize: 12,
    lineHeight: 17,
    textAlign: "center",
    color: "#FFFFFF",
  },

  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 120,
  },

  arrowRow: {
    position: "absolute",
    left: 16,
    right: 24,
    bottom: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  arrowText: {
    padding: 4,
    fontSize: 38,
    color: "#1A1208",
  },

  optionCard: {
    ...boxBase,
    backgroundColor: "#8E8B76",
  },

  optionActive: {
    ...boxBase,
    backgroundColor: "#D9B77E",
  },

  optionSpecial: {
    ...boxBase,
    backgroundColor: "#C62828",
  },

  optionColumn: {
    width: "58%",
    alignSelf: "center",
    marginTop: 16,
  },

  optionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  optionHalf: {
    width: "48%",
    marginTop: 16,
  },

  optionText: {
    flex: 1,
    textAlign: "center",
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    textTransform: "uppercase",
    textShadowColor: "#000",
    textShadowRadius: 2,
  },

  optionButton: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  lightText: {
    flex: 1,
    paddingVertical: 0,
    fontSize: 16,
    fontWeight: "bold",
    color: "#1A1208",
  },

  centerBox: {
    width: "70%",
    alignSelf: "center",
    marginTop: 40,
  },

  boxIcon: {
    fontSize: 26,
  },

  highlightBox: {
    width: "68%",
    alignSelf: "center",
    alignItems: "center",
    marginTop: 24,
    paddingVertical: 24,
    paddingHorizontal: 12,
    borderWidth: 4,
    borderColor: "#C62828",
    borderRadius: 24,
  },

  bigText: {
    fontSize: 22,
    lineHeight: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#D9B77E",
  },

  separator: {
    marginTop: 20,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFFFFF",
  },
});

export default newCharacterStyle;
