import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  botaoVoltar: {
    padding: "5%",
    width: "100%",
  },

  containerFundo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalView: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: "5%",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },

  titulo: {
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  descricao: {
    textAlign: "center",
    marginTop: 20,
    color: "#5C5F60",
    fontSize: 13,
    fontWeight: 500,
  },
});
