import { useEffect, useState } from "react";
import { Text, View, Pressable, Alert, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types/navigation";
import { useEggEntries } from "../context/EggEntriesContext";
import { useAuth } from "../context/AuthContext";
import { saveEggEntry } from "../services/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { syncEggReminderForToday } from "../services/notifications";

type Props = NativeStackScreenProps<RootStackParamList, "AddEggs">;

export default function AddEggsScreen({ route, navigation }: Props) {
  const { date } = route.params;
  const { getEggCountForDate, setEggCountForDate } = useEggEntries();
  const { user } = useAuth();
  const [eggs, setEggs] = useState<number>(0);

  useEffect(() => {
    setEggs(getEggCountForDate(date));
  }, [date, getEggCountForDate]);

  const handleSave = async () => {
    if (!user) return;

    try {
      setEggCountForDate(date, eggs);
      await saveEggEntry(user.uid, date, eggs);

      const today = new Date().toISOString().split("T")[0];
      const notificationsEnabled =
        (await AsyncStorage.getItem("eggReminderEnabled")) === "true";

      if (date === today) {
        await syncEggReminderForToday({
          enabled: notificationsEnabled,
          todayEggCount: eggs,
          hour: 18,
          minute: 0,
        });
      }

      Alert.alert("Uloženo", `Datum: ${date}\nPočet vajec: ${eggs}`);
      navigation.goBack();
    } catch (error: any) {
      Alert.alert("Chyba", error?.message ?? "Nepodařilo se uložit data");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-zinc-50">
      <View className="flex-1 px-5 pt-4 pb-10">
        <View className="mb-6">
          <Text className="text-3xl font-bold text-zinc-900">Záznam vajec</Text>
          <Text className="mt-2 text-base text-zinc-500">
            Přidej nebo uprav snůšku pro vybraný den
          </Text>
        </View>

        <View className="rounded-[28px] bg-amber-50 px-5 py-5 shadow-sm">
          <View className="flex-row items-start justify-between">
            <View className="flex-1 pr-4">
              <Text className="text-sm font-semibold uppercase tracking-wide text-orange-700">
                Vybraný den
              </Text>

              <Text className="mt-3 text-2xl font-bold text-zinc-900">
                {date}
              </Text>

              <Text className="mt-2 text-base text-zinc-500">
                Nastav počet snesených vajec
              </Text>
            </View>

            <View className="items-center justify-center rounded-3xl bg-white/70 p-2">
              <Image
                source={require("../../assets/eggs.png")}
                className="h-24 w-24"
                resizeMode="contain"
              />
            </View>
          </View>

          <View className="mt-8 rounded-3xl bg-white px-4 py-5">
            <Text className="text-xl font-medium text-zinc-500">
              Počet vajec
            </Text>

            <View className="mt-4 flex-row items-center justify-between">
              <Pressable
                onPress={() => setEggs((prev) => Math.max(0, prev - 1))}
                className="h-14 w-14 items-center justify-center rounded-2xl bg-zinc-900"
              >
                <Text className="text-2xl font-bold text-white">-</Text>
              </Pressable>

              <View className="mx-4 flex-1 items-center rounded-2xl bg-zinc-50 py-4">
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
            className="mt-6 rounded-2xl bg-blue-600 py-4"
          >
            <Text className="text-center text-base font-semibold text-white">
              Uložit záznam
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.goBack()}
            className="mt-3 rounded-2xl bg-zinc-200 py-4"
          >
            <Text className="text-center text-base font-semibold text-zinc-900">
              Zpět
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}