
import { Alert, Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

// Configura como a notificação será exibidaquando o app estiver aberto
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// funcao para permissão para o usuário receber notificações
export async function pedirPermissaoNotificacao() {
  if (!Device.isDevice) {
    Alert.alert("Aviso", "Teste notificações em um dispositivo físico.");
    return false;
  }

  const { status: statusAtual } = await Notifications.getPermissionsAsync();

  let statusFinal = statusAtual;

  if (statusAtual !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    statusFinal = status;
  }

  if (statusFinal !== "granted") {
    Alert.alert(
      "Permissão negada",
      "Você não permitiu o envio de notificações.",
    );
    return false;
  }

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return true;
}

// export async function enviarNotificacaoLocal() {
//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: "Lembrete 🔔",
//       body: "Notificacao instantanea",
//       sound: true,
//     },
//     trigger: null,
//   });
// }

export async function enviarNotificacaoPromo(segundos: number) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Ei...😉​",
      body: `Já está sabendo? Agora você pode trocar doações por pontos em nossa loja`,
      sound: true,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: segundos,
      repeats: false,
    },
  });
}

export async function enviarNotificacaoBoasVindas(segundos: number) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Bem-vindo ao HemoLink! 🩸",
      body: "Obrigado por fazer parte do HemoLink. Cada doação pode ajudar a salvar vidas.",
      sound: true,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: segundos,
      repeats: false,
    },
  });
}