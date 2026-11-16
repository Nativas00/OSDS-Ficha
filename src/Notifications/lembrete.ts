import { Platform } from "react-native";
import * as Notifications from "expo-notifications";

let lembrete: string | null = null;

export async function pedirPermissao() {
  if (Platform.OS === "android") {
    try {
      await Notifications.setNotificationChannelAsync("lembretes", {
        name: "Lembretes",
        importance: Notifications.AndroidImportance.HIGH,
      });
    } catch {
      console.log("Canal de lembretes indisponível, usando o canal padrão.");
    }
  }

  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") {
    return false;
  }

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  return true;
}

export async function agendarLembrete() {
  await cancelarLembrete();

  lembrete = await Notifications.scheduleNotificationAsync({
    content: {
      title: "Ei, parceiro!",
      body: "Você ainda não terminou de criar seu personagem. Volte para terminar.",
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 5,
      channelId: "lembretes",
    },
  });
}

export async function cancelarLembrete() {
  if (lembrete) {
    await Notifications.cancelScheduledNotificationAsync(lembrete);
    lembrete = null;
  }

  await Notifications.dismissAllNotificationsAsync();
}
