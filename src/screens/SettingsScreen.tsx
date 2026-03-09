import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Alert } from "react-native";
import { useEffect, useState } from "react";

import { exportEggEntriesToCsv } from "../features/stats/statsExport";
import { useEggEntries } from "../context/EggEntriesContext";

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
  getLanguagePreference,
  setLanguagePreference,
} from "../services/settingsStorage";

import { getTodayDateString } from "../utils/date";

export default function SettingsScreen() {
  const { eggEntries, getEggCountForDate } = useEggEntries();

  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [language, setLanguage] = useState<"cs" | "en">("cs");

  const today = getTodayDateString();

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    const notifications = await getNotificationPreference();
    const lang = await getLanguagePreference();

    setNotificationsEnabled(notifications);

    if (lang) {
      setLanguage(lang);
    }
  };

  const handleLanguagePress = async () => {
    const next = language === "cs" ? "en" : "cs";
    setLanguage(next);
    await setLanguagePreference(next);
  };

  const handleNotificationsToggle = async (value: boolean) => {
    if (value) {
      await setupNotificationChannel();

      const granted = await requestNotificationPermissions();

      if (!granted) {
        Alert.alert(
          "Notifikace nejsou povolené",
          "Povol notifikace v systému, aby připomenutí fungovalo."
        );

        setNotificationsEnabled(false);
        await setNotificationPreference(false);
        return;
      }

      const todayEggCount = getEggCountForDate(today);

      await syncEggReminderForToday({
        enabled: true,
        todayEggCount,
        hour: 18,
        minute: 0,
      });

      setNotificationsEnabled(true);
      await setNotificationPreference(true);

      Alert.alert("Hotovo", "Připomenutí bylo nastaveno.");
      return;
    }

    await cancelEggReminder();

    setNotificationsEnabled(false);
    await setNotificationPreference(false);

    Alert.alert("Hotovo", "Připomenutí bylo vypnuto.");
  };

  return (
    <SafeAreaView className="flex-1 bg-zinc-50">
      <View className="flex-1 px-5 pt-4 pb-10">
        <View className="mb-6">
          <Text className="text-3xl font-bold text-zinc-900">Nastavení</Text>
          <Text className="mt-2 text-base text-zinc-500">
            Správa aplikace, dat a budoucích funkcí
          </Text>
        </View>

        <SettingsSection title="Data">
          <SettingsButtonRow
            icon="download-outline"
            title="Export statistik do CSV"
            subtitle="Stáhne a nasdílí všechny záznamy vajec"
            onPress={() => exportEggEntriesToCsv(eggEntries)}
          />
        </SettingsSection>

        <SettingsSection title="Aplikace">
          <SettingsButtonRow
            icon="language-outline"
            title="Jazyk aplikace"
            subtitle={language === "cs" ? "🇨🇿 Čeština" : "🇬🇧 English"}
            onPress={handleLanguagePress}
          />
        </SettingsSection>

        <SettingsSection title="Upozornění">
          <SettingsSwitchRow
            icon="notifications-outline"
            title="Denní připomenutí"
            subtitle="Připomene zapsání vajec, pokud dnešní záznam chybí"
            value={notificationsEnabled}
            onValueChange={handleNotificationsToggle}
          />
        </SettingsSection>

        <SettingsSection title="O aplikaci">
          <SettingsInfoRow
            icon="information-circle-outline"
            title="Verze aplikace"
            value="1.0.0"
          />
        </SettingsSection>
      </View>
    </SafeAreaView>
  );
}
