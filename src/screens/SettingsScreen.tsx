import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Alert } from "react-native";
import { useEffect, useState } from "react";

import { exportEggEntriesToCsv } from "../features/stats/statsExport";
import { useEggEntries } from "../context/EggEntriesContext";
import { useLanguage } from "../context/LanguageContext";

import { SettingsSection } from "../components/settings/SettingsSection";
import { SettingsButtonRow } from "../components/settings/SettingsButtonRow";
import { SettingsInfoRow } from "../components/settings/SettingInfoRow";
import { SettingsSwitchRow } from "../components/settings/SettingsSwitchRow";

import {
  setupNotificationChannel,
  requestNotificationPermissions,
  cancelEggReminder,
  syncEggReminderForToday,
} from "../services/notifications";

import {
  getNotificationPreference,
  setNotificationPreference,
} from "../services/settingsStorage";

import { getTodayDateString } from "../utils/date";

export default function SettingsScreen() {
  const { eggEntries, getEggCountForDate } = useEggEntries();
  const { language, setLanguage, t } = useLanguage();

  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const today = getTodayDateString();

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    const notifications = await getNotificationPreference();
    setNotificationsEnabled(notifications);
  };

  const handleLanguagePress = async () => {
    const next = language === "cs" ? "en" : "cs";
    await setLanguage(next);

    if (notificationsEnabled) {
      const todayEggCount = getEggCountForDate(today);

      await setupNotificationChannel(next);

      await syncEggReminderForToday({
        enabled: true,
        todayEggCount,
        language: next,
        hour: 18,
        minute: 0,
      });
    }
  };

  const handleNotificationsToggle = async (value: boolean) => {
    if (value) {
      await setupNotificationChannel(language);

      const granted = await requestNotificationPermissions();

      if (!granted) {
        Alert.alert(
          t("settings.alerts.notificationsDeniedTitle"),
          t("settings.alerts.notificationsDeniedMessage")
        );

        setNotificationsEnabled(false);
        await setNotificationPreference(false);
        return;
      }

      const todayEggCount = getEggCountForDate(today);

      await syncEggReminderForToday({
        enabled: true,
        todayEggCount,
        language,
        hour: 18,
        minute: 0,
      });

      setNotificationsEnabled(true);
      await setNotificationPreference(true);

      Alert.alert(
        t("settings.alerts.done"),
        t("settings.alerts.reminderEnabled")
      );
      return;
    }

    await cancelEggReminder();

    setNotificationsEnabled(false);
    await setNotificationPreference(false);

    Alert.alert(
      t("settings.alerts.done"),
      t("settings.alerts.reminderDisabled")
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-zinc-50">
      <View className="flex-1 px-5 pt-4 pb-10">
        <View className="mb-6">
          <Text className="text-3xl font-bold text-zinc-900">
            {t("settings.title")}
          </Text>
          <Text className="mt-2 text-base text-zinc-500">
            {t("settings.subtitle")}
          </Text>
        </View>

        <SettingsSection title={t("settings.data")}>
          <SettingsButtonRow
            icon="download-outline"
            title={t("settings.exportCsv")}
            subtitle={t("settings.exportCsvSubtitle")}
            onPress={() => exportEggEntriesToCsv(eggEntries)}
          />
        </SettingsSection>

        <SettingsSection title={t("settings.app")}>
          <SettingsButtonRow
            icon="language-outline"
            title={t("settings.appLanguage")}
            subtitle={
              language === "cs"
                ? t("settings.languageCs")
                : t("settings.languageEn")
            }
            onPress={handleLanguagePress}
          />
        </SettingsSection>

        <SettingsSection title={t("settings.notifications")}>
          <SettingsSwitchRow
            icon="notifications-outline"
            title={t("settings.dailyReminder")}
            subtitle={t("settings.dailyReminderSubtitle")}
            value={notificationsEnabled}
            onValueChange={handleNotificationsToggle}
          />
        </SettingsSection>

        <SettingsSection title={t("settings.about")}>
          <SettingsInfoRow
            icon="information-circle-outline"
            title={t("settings.appVersion")}
            value="1.0.0"
          />
        </SettingsSection>
      </View>
    </SafeAreaView>
  );
}