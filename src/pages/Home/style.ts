import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    backgroundColor: "white",
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
    // lineHeight: 1.2,
    marginBottom: 5,
    fontWeight: 700,
  },

  subTitle: {
    color: "#5C5F60",
    fontSize: 15,
    fontWeight: 400,
  },

  cardContainer: {
    marginTop: 50,
    paddingHorizontal: "5%",
    backgroundColor: "#C8102E",
    display: "flex",
    justifyContent: "space-between",
  },

  headerContainer: {},
});
