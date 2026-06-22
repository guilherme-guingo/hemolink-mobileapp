import { StyleSheet } from "react-native";
import { theme } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.terciary,
  },
  scroll: {
    padding: 20,
    paddingBottom: 60,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  acoes: {
    marginTop: 20,
  },
  backButton: {
    marginBottom: 15,
    marginTop: 40,
  },
  mapContainer: {
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    elevation: 3,
  },
  mapTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.secondary,
    marginBottom: 10,
  },
  map: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
});
