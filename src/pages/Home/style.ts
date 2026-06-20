import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    backgroundColor: "#F6FAFF",
  },

  containerTitulo: {
    marginHorizontal: "5%",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  containerTituloFilho: {
    marginTop: 30,
  },

  titulo: {
    fontSize: 33,
    color: "#141D23",
    marginBottom: 5,
    fontWeight: 700,
  },

  subTitulo: {
    color: "#5C5F60",
    fontSize: 16,
    fontWeight: 400,
    letterSpacing: 1,
  },

  cardContainer: {
    marginTop: 30,
    paddingHorizontal: "5%",
    paddingVertical: "10%",
    backgroundColor: "#C8102E",
    display: "flex",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    elevation: 3,
    marginHorizontal: "5%",
  },

  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  headerTitulo: {
    color: "#FFDAD8",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 1,
  },

  statusContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },

  miniCard: {
    flex: 1,
    padding: "5%",
    backgroundColor: "#CE2843",
    borderWidth: 1,
    borderColor: "#D34159",
    borderRadius: 12,
  },

  numero: {
    fontSize: 40,
    color: "#FFDAD8",
    fontWeight: "700",
    marginBottom: 4,
  },

  descricaoNumero: {
    fontSize: 12,
    color: "#FFDAD8",
    fontWeight: "600",
  },

  containerAgendamento: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: "5%",
    marginTop: 30,
  },

  tituloAgendamento: {
    letterSpacing: 1,
    color: "#5C5F60",
    fontWeight: "700",
    fontSize: 16,
  },

  containerCalendario: {
    justifyContent: "center",
  },

  containerAgenda: {
    marginTop: 10,
    marginHorizontal: "5%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    paddingVertical: "5%",
    paddingHorizontal: "5%",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  data: {
    backgroundColor: "#FFDAD8",
    paddingHorizontal: "5%",
    paddingVertical: "2%",
    borderRadius: 12,
  },

  dataMes: {
    color: "#9E001F",
    fontSize: 15,
    textAlign: "center",
    lineHeight: 16,
  },

  dataDia: {
    color: "#9E001F",
    fontWeight: "700",
    fontSize: 30,
    textAlign: "center",
    lineHeight: 32,
  },

  containerData: {
    flex: 1,
    justifyContent: "center",
    marginRight: 30,
    marginLeft: 10,
  },

  tituloData: {
    color: "#141D23",
    fontSize: 15,
  },

  subtituloData: {
    color: "#5C5F60",
  },

  containerBotao: {
    justifyContent: "center",
    // marginLeft: 20,
  },
});
