import { StyleSheet } from "react-native";

import type { ViewStyle } from "react-native";

const panelBase: ViewStyle = {
  borderWidth: 1.5,
  borderColor: "#BDBDBD",
  borderRadius: 12,
  backgroundColor: "#000",
  elevation: 4,
  shadowColor: "#FFFFFF",
  shadowOpacity: 0.4,
  shadowRadius: 6,
  shadowOffset: { width: 0, height: 0 },
};

const characterStyle = StyleSheet.create({
  scroll: {
    paddingHorizontal: 16,
    paddingTop: 44,
    paddingBottom: 110,
  },

  logo: {
    height: 82,
    aspectRatio: 783 / 164,
    marginTop: 30,
    alignSelf: "center",
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    zIndex: 10,
  },

  nameBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 46,
    marginRight: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: "#D9D9D9",
    shadowColor: "#FFFFFF",
    shadowOpacity: 0.5,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },

  nameText: {
    width: "100%",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 1,
    color: "#7A6A48",
    textTransform: "uppercase",
  },

  levelWrapper: {
    width: 92,
  },

  levelBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 46,
    borderRadius: 12,
    backgroundColor: "#D9D9D9",
    shadowColor: "#FFFFFF",
    shadowOpacity: 0.5,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },

  levelText: {
    fontSize: 11,
    fontWeight: "900",
    color: "#4A4030",
    textTransform: "uppercase",
  },

  levelArrow: {
    marginLeft: 6,
    fontSize: 18,
    color: "#000",
  },

  levelList: {
    position: "absolute",
    top: 52,
    left: 0,
    right: 0,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "#D9D9D9",
    elevation: 8,
  },

  levelItem: {
    paddingVertical: 6,
    alignItems: "center",
  },

  levelItemText: {
    fontSize: 12,
    fontWeight: "900",
    color: "#4A4030",
    textTransform: "uppercase",
  },

  sectionTitle: {
    marginTop: 22,
    marginLeft: 36,
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 1,
    color: "#D9B77E",
    textTransform: "uppercase",
  },

  row: {
    flexDirection: "row",
    marginTop: 6,
  },

  rowSpaced: {
    flexDirection: "row",
    marginTop: 12,
  },

  panel: {
    ...panelBase,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },

  panelCenterTitle: {
    marginBottom: 4,
    textAlign: "center",
    fontSize: 10,
    fontWeight: "900",
    color: "#FFFFFF",
    textTransform: "uppercase",
  },

  panelTitle: {
    fontSize: 10,
    fontWeight: "900",
    color: "#FFFFFF",
    textTransform: "uppercase",
  },

  innerBox: {
    ...panelBase,
    flex: 1,
    padding: 6,
    shadowOpacity: 0.2,
  },

  fieldBox: {
    ...panelBase,
    padding: 6,
    shadowOpacity: 0.2,
  },

  fieldInput: {
    flex: 1,
    padding: 0,
    marginTop: 2,
    fontSize: 12,
    color: "#FFFFFF",
    textAlignVertical: "top",
  },

  attributesPanel: {
    flex: 2.3,
  },

  statsPanel: {
    flex: 0.85,
    marginHorizontal: 8,
  },

  sidePanel: {
    flex: 1.7,
  },

  sideBox: {
    ...panelBase,
    flex: 1,
    padding: 6,
    shadowOpacity: 0.2,
  },

  sideBoxSpacing: {
    marginTop: 8,
  },

  statLabel: {
    marginTop: 6,
    textAlign: "center",
    fontSize: 10,
    fontWeight: "900",
    color: "#FFFFFF",
    textTransform: "uppercase",
  },

  statInput: {
    height: 18,
    marginTop: 2,
    paddingVertical: 0,
    paddingHorizontal: 4,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#BDBDBD",
    textAlign: "center",
    fontSize: 11,
    color: "#FFFFFF",
  },

  traitRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 25,
  },

  traitName: {
    flex: 1,
    marginRight: 4,
    fontSize: 11,
    fontWeight: "900",
    color: "#FFFFFF",
    textTransform: "uppercase",
  },

  dots: {
    flexDirection: "row",
  },

  dot: {
    width: 14,
    height: 14,
    marginLeft: 1,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: "#BDBDBD",
    backgroundColor: "transparent",
  },

  dotFilled: {
    backgroundColor: "#D9B77E",
    borderColor: "#D9B77E",
  },

  backgroundsPanel: {
    flex: 1,
    marginRight: 8,
  },

  skillsPanel: {
    flex: 1,
  },

  skillsInput: {
    flex: 1,
    padding: 0,
    marginTop: 6,
    fontSize: 12,
    color: "#FFFFFF",
    textAlignVertical: "top",
  },

  reputationPanel: {
    ...panelBase,
    flex: 1,
    flexDirection: "row",
    padding: 8,
    height: 100,
  },

  reputationBox: {
    flex: 3,
    marginRight: 8,
  },

  levelBoxSmall: {
    flex: 1.2,
  },

  diceButton: {
    position: "absolute",
    right: 16,
    bottom: 24,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D9D9D9",
    elevation: 6,
  },

  diceIcon: {
    fontSize: 26,
  },

  diceResult: {
    position: "absolute",
    right: 72,
    bottom: 34,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: "#D9B77E",
  },

  diceResultText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1A1208",
  },

  creationOverlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },

  creationTitle: {
    fontSize: 32,
    fontWeight: "900",
    letterSpacing: 4,
    textAlign: "center",
    color: "#D9B77E",
    textTransform: "uppercase",
  },

  creationLine: {
    height: 3,
    marginTop: 14,
    borderRadius: 2,
    backgroundColor: "#C62828",
  },

  creationSubtitle: {
    marginTop: 14,
    fontSize: 14,
    letterSpacing: 2,
    color: "#CFCFCF",
    textTransform: "uppercase",
  },
});

export default characterStyle;