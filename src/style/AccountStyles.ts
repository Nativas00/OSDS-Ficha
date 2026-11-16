import { StyleSheet } from "react-native";

const accountStyles = StyleSheet.create({
  content: {
    height: 790,
  },

  loginContent: {
    flex: 1,
    justifyContent: "center",
    marginTop: 85,
  },

  title: {
    width: "85%",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 12,
    color: "#E6C17D",
    fontSize: 21,
    fontWeight: "900",
  },

  form: {
    width: "85%",
    alignSelf: "center",
    backgroundColor: "#D9D9D9",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 21,
  },

  formPrimaryButton: {
    height: 42,
    backgroundColor: "#D9B77E",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },

  formSecondaryButton: {
    height: 42,
    backgroundColor: "#29221A",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },

  formText: {
    color: "#000",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 8,
  },

  smallText: {
    color: "#000",
    fontSize: 14,
    marginBottom: 2,
    padding: 2,
    textAlign: "center",
  },

  registerScroll: {
    flexGrow: 1,
    paddingBottom: 25,
  },

  terms: {
    flexDirection: "row",
    alignItems: "center",
  },

  checkbox: {
    width: 14,
    height: 14,
    backgroundColor: "#e2e4e5",
    borderWidth: 1,
    borderColor: "#403e3e",
    marginRight: 7,
    alignItems: "center",
    justifyContent: "center",
  },

  checkmark: {
    color: "#000",
    fontSize: 11,
    fontWeight: "bold",
  },

  links: {
    marginLeft: 21,
    marginTop: 5,
  },
});

export default accountStyles;
