import { StyleSheet } from "react-native";

// Estilos gerais do aplicativo, procure utilizar esses estilos ao inves de criar 
// novos do mesmo João Gonçalves, para manter a consistência visual do aplicativo e o
// codigo bem polido.

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

  // Botões
  primaryButton: {
    backgroundColor: "#D9B77E",
    alignItems: "center",
    justifyContent: "center",
  },

  secondaryButton: {
    alignItems: "center",
    justifyContent: "center",
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
    width: "100%",
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
    paddingBottom: 24,
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

  pillPrimary: {
    paddingVertical: 14,
    borderRadius: 30,
  },

  pillSecondary: {
    marginTop: 14,
    paddingVertical: 12,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#D9B77E",
  },
});

export default styles;
