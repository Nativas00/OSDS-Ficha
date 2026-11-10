import { StyleSheet } from "react-native";

const accountStyles = StyleSheet.create({
  // style utilizados em Login e criação de conta
  content: {
    height: 790,
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
    marginTop: 5,
    borderRadius: 8,
  },

  formSecondaryButton: {
    height: 42,
    backgroundColor: "#29221A",
    borderRadius: 8,
  },

  formButtonText: {
    fontWeight: "500",
  },

  formText: {
    color: "#000",
    fontSize: 16,
  },

  smallText: {
    color: "#000",
    fontSize: 14,
  },

  // area para o Login
  loginContent: {
    justifyContent: "center",
  },

  separator: {
    textAlign: "center",
    marginVertical: 8,
  },

  forgotButton: {
    alignItems: "center",
    marginTop: 16,
  },

  // area para a criação de conta
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

  linkText: {
    marginBottom: 2,
    padding: 2,
    textAlign: "center",
  },
});

export default accountStyles;
