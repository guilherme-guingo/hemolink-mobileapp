import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#ffffff",
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
  },

  modalHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  containerQrCode: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 40,
    width: "100%",
  },

  containerPai: {
    display: "flex",
    backgroundColor: "#ECF5FE",
    borderColor: "#EAD0CF",
    borderWidth: 1,
    padding: 20,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  containerFilho: {
    backgroundColor: "#F1F1F1",
    borderColor: "#ffffff",
    borderWidth: 10,
    borderRadius: 12,
    padding: 20,
  },

  qrCodeDescricao: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  botaoVoltar: {
    padding: "5%",
    width: "100%",
  },
});
