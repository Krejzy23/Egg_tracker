import AsyncStorage from "@react-native-async-storage/async-storage";
import type { AppLanguage } from "../i18n";

const NOTIFICATION_KEY = "notifications_enabled";
const LANGUAGE_KEY = "language_preference";

export async function getNotificationPreference(): Promise<boolean> {
  const value = await AsyncStorage.getItem(NOTIFICATION_KEY);
  return value === "true";
}

export async function setNotificationPreference(value: boolean): Promise<void> {
  await AsyncStorage.setItem(NOTIFICATION_KEY, String(value));
}

export async function getLanguagePreference(): Promise<AppLanguage | null> {
  const value = await AsyncStorage.getItem(LANGUAGE_KEY);

  if (value === "cs" || value === "en") return value;
  return null;
}

export async function setLanguagePreference(language: AppLanguage): Promise<void> {
  await AsyncStorage.setItem(LANGUAGE_KEY, language);
}