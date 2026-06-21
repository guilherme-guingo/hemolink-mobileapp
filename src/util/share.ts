import { Share } from "react-native";
import Toast from "react-native-toast-message";

export async function compartilharApp() {
  try {
    await Share.share({
      message:
        "Conheça o HemoLink! 🩸 Um app para acompanhar informações sobre doação de sangue e incentivar esse gesto que salva vidas.",
    });
  } catch (error) {
    Toast.show({ type: "error", text1: "Erro ao compartilhar informações" });
  }
}
