import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

const REMINDER_IDENTIFIER = "egg-reminder";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export async function setupNotificationChannel() {
    if (Platform.OS !== "android") return;

    await Notifications.setNotificationChannelAsync("egg-reminders", {
        name: "Egg reminders",
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

export async function scheduleNextEggReminder(hour = 18, minute = 0) {
    await cancelEggReminder();

    const now = new Date();
    const todayReminder = createReminderDate(hour, minute, 0);

    const triggerDate =
        now < todayReminder
            ? todayReminder
            : createReminderDate(hour, minute, 1);

    console.log("Next reminder scheduled:", triggerDate);

    await Notifications.scheduleNotificationAsync({
        identifier: REMINDER_IDENTIFIER,
        content: {
            title: "Egg Tracker",
            body: "Nezapomeň zapsat dnešní vejce 🥚",
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
    hour?: number;
    minute?: number;
}) {
    const {
        enabled,
        todayEggCount,
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

    await scheduleNextEggReminder(hour, minute);
}