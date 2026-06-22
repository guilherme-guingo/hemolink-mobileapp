import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    backgroundColor: "#F6FAFF",
  },

  loadingContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  containerTitulo: {
    padding: "5%",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  containerTituloFilho: {
    marginTop: 30,
  },

  title: {
    fontSize: 30,
    color: "#141D23",
    marginBottom: 5,
    fontWeight: 700,
  },
  subTitle: {
    color: "#5C5F60",
    fontSize: 15,
    fontWeight: 400,
  },

  containerInput: {
    marginVertical: 10,
  },

  containerCard: {
    paddingHorizontal: "5%",
  },
});
