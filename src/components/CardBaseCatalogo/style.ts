import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: 320,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
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
