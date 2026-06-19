import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",

    // teste
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "blue",
    marginBottom: 16,
  },

  containerImagem: {
    width: "100%",
    // position: 'relative';
  },
  containerEndereco: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  imagem: {
    width: "100%",
    height: 120,
    objectFit: "cover",
  },
});
