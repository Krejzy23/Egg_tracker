import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getNotificationPreference() {
  return (await AsyncStorage.getItem("eggReminderEnabled")) === "true";
}

export async function setNotificationPreference(value: boolean) {
  await AsyncStorage.setItem("eggReminderEnabled", value ? "true" : "false");
}

export async function getLanguagePreference() {
  return (await AsyncStorage.getItem("appLanguage")) as "cs" | "en" | null;
}

export async function setLanguagePreference(value: "cs" | "en") {
  await AsyncStorage.setItem("appLanguage", value);
}