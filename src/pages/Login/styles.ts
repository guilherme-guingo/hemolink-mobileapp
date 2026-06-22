import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6FAFF", 
    paddingHorizontal: 24,
    justifyContent: "center",
  },

  errorText: {
    fontSize: 12,
    color: "#C8102E",
    marginTop: 4,
    marginBottom: 12,
    paddingLeft: 4,
  },

  passwordContainer: {
    width: "100%",
    position: "relative",
    justifyContent: "center",
  },

  toggleButton: {
    position: "absolute",
    right: 16,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    marginTop: -6,
  },

  eyeIcon: {
    color: "#8E8E93",
    fontSize: 22,
    top:-4
  },

  signUpContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 16,
  },

  signUpText: {
    fontSize: 14,
    color: "#141D23", 
  },

  signUpBoldText: {
    fontWeight: "700",
    color: "#C8102E", 
  },
});