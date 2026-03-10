import { useEffect, useState } from "react";
import { Text, View, Pressable, Alert, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import Header from "../components/Header";
import type { RootStackParamList } from "../types/navigation";
import { useEggEntries } from "../context/EggEntriesContext";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { saveEggEntry } from "../services/firestore";
import { getNotificationPreference } from "../services/settingsStorage";
import { syncEggReminderForToday } from "../services/notifications";

type Props = NativeStackScreenProps<RootStackParamList, "AddEggs">;

export default function AddEggsScreen({ route, navigation }: Props) {
  const { date } = route.params;
  const { getEggCountForDate, setEggCountForDate } = useEggEntries();
  const { user } = useAuth();
  const { t, language } = useLanguage();

  const [eggs, setEggs] = useState<number>(0);

  const formattedDate = new Date(date).toLocaleDateString(
    language === "cs" ? "cs-CZ" : "en-US",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  useEffect(() => {
    setEggs(getEggCountForDate(date));
  }, [date, getEggCountForDate]);

  const handleSave = async () => {
    if (!user) return;

    try {
      setEggCountForDate(date, eggs);
      await saveEggEntry(user.uid, date, eggs);

      const today = new Date().toISOString().split("T")[0];
      const notificationsEnabled = await getNotificationPreference();

      if (date === today) {
        await syncEggReminderForToday({
          enabled: notificationsEnabled,
          todayEggCount: eggs,
          language,
          hour: 18,
          minute: 0,
        });
      }

      Alert.alert(
        t("addEggs.alerts.savedTitle"),
        t("addEggs.alerts.savedMessage", { date: formattedDate, count: eggs })
      );

      navigation.goBack();
    } catch (error: any) {
      Alert.alert(
        t("addEggs.alerts.errorTitle"),
        error?.message ?? t("addEggs.alerts.errorMessage")
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-zinc-50">
      <View className="flex-1 px-5 pt-4 pb-10">
        <Header
          title={t("addEggs.title")}
          subtitle={t("addEggs.subtitle")}
        />

        <View className="rounded-[28px] bg-amber-50 px-5 py-5 shadow-sm">
          <View className="flex-row items-start justify-between">
            <View className="flex-1 pr-4">
              <Text className="text-base font-semibold uppercase tracking-wide text-amber-900">
                {t("addEggs.selectedDay")}
              </Text>

              <Text className="mt-4 text-2xl font-bold text-zinc-900">
                {formattedDate}
              </Text>

              <Text className="mt-8 text-base text-zinc-500">
                {t("addEggs.selectedDaySubtitle")}
              </Text>
            </View>

            <View className="items-center justify-center rounded-3xl bg-white/70 p-2">
              <Image
                source={require("../../assets/eggs.png")}
                className="h-28 w-28"
                resizeMode="contain"
              />
            </View>
          </View>

          <View className="mt-2 rounded-3xl bg-white px-4 py-5">
            <Text className="text-xl font-medium text-zinc-500">
              {t("addEggs.eggCount")}
            </Text>

            <View className="mt-4 flex-row items-center justify-between">
              <Pressable
                onPress={() => setEggs((prev) => Math.max(0, prev - 1))}
                className="h-14 w-14 items-center justify-center rounded-2xl bg-zinc-900"
              >
                <Text className="text-2xl font-bold text-white">-</Text>
              </Pressable>

              <View className="mx-4 flex-1 items-center rounded-2xl bg-zinc-50 py-2">
                <Text className="text-5xl font-bold text-zinc-900">{eggs}</Text>
              </View>

              <Pressable
                onPress={() => setEggs((prev) => prev + 1)}
                className="h-14 w-14 items-center justify-center rounded-2xl bg-zinc-900"
              >
                <Text className="text-2xl font-bold text-white">+</Text>
              </Pressable>
            </View>
          </View>

          <Pressable
            onPress={handleSave}
            className="mt-4 rounded-2xl bg-amber-900 py-4"
          >
            <Text className="text-center text-base font-semibold text-white">
              {t("addEggs.save")}
            </Text>
          </Pressable>

        </View>
          <Pressable
            onPress={() => navigation.goBack()}
            className="mt-10 rounded-2xl bg-blue-600 py-4"
          >
            <Text className="text-center text-base font-semibold text-white">
              {t("addEggs.back")}
            </Text>
          </Pressable>
      </View>
    </SafeAreaView>
  );
}
