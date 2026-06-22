import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

const REMINDER_IDENTIFIER = "egg-reminder";

export type AppLanguage = "cs" | "en";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function getNotificationTexts(language: AppLanguage) {
  if (language === "cs") {
    return {
      channelName: "Připomenutí vajec",
      title: "Egg Tracker",
      body: "Nezapomeň zapsat dnešní vejce 🥚",
    };
  }

  return {
    channelName: "Egg reminders",
    title: "Egg Tracker",
    body: "Don't forget to record today's eggs 🥚",
  };
}

export async function setupNotificationChannel(language: AppLanguage) {
  if (Platform.OS !== "android") return;

  const texts = getNotificationTexts(language);

  await Notifications.setNotificationChannelAsync("egg-reminders", {
    name: texts.channelName,
    importance: Notifications.AndroidImportance.DEFAULT,
  });
}

export async function requestNotificationPermissions() {
  const settings = await Notifications.getPermissionsAsync();

  if (settings.granted) {
    return true;
  }

  const requested = await Notifications.requestPermissionsAsync();
  return requested.granted;
}

export async function cancelEggReminder() {
  const scheduled = await Notifications.getAllScheduledNotificationsAsync();

  for (const item of scheduled) {
    if (item.identifier === REMINDER_IDENTIFIER) {
      await Notifications.cancelScheduledNotificationAsync(item.identifier);
    }
  }
}

function createReminderDate(hour: number, minute: number, daysToAdd = 0) {
  const date = new Date();
  date.setSeconds(0);
  date.setMilliseconds(0);
  date.setHours(hour, minute, 0, 0);
  date.setDate(date.getDate() + daysToAdd);
  return date;
}

export async function scheduleNextEggReminder(
  language: AppLanguage,
  hour = 18,
  minute = 0
) {
  await cancelEggReminder();

  const now = new Date();
  const todayReminder = createReminderDate(hour, minute, 0);

  const triggerDate =
    now < todayReminder
      ? todayReminder
      : createReminderDate(hour, minute, 1);

  const texts = getNotificationTexts(language);

  console.log("Next reminder scheduled:", triggerDate);

  await Notifications.scheduleNotificationAsync({
    identifier: REMINDER_IDENTIFIER,
    content: {
      title: texts.title,
      body: texts.body,
      sound: false,
    },
    trigger: {
      date: triggerDate,
      channelId: "egg-reminders",
    },
  });
}

export async function syncEggReminderForToday(params: {
  enabled: boolean;
  todayEggCount: number;
  language: AppLanguage;
  hour?: number;
  minute?: number;
}) {
  const {
    enabled,
    todayEggCount,
    language,
    hour = 18,
    minute = 0,
  } = params;

  if (!enabled) {
    await cancelEggReminder();
    return;
  }

  if (todayEggCount > 0) {
    await cancelEggReminder();
    return;
  }

  await scheduleNextEggReminder(language, hour, minute);
}