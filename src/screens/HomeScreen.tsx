import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, Pressable, Alert, Image } from "react-native";
import { useEggEntries } from "../context/EggEntriesContext";
import { useAuth } from "../context/AuthContext";
import { saveChickenCount } from "../services/firestore";
import { useLanguage } from "../context/LanguageContext";

import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { RootTabParamList, RootStackParamList } from "../types/navigation";
import type { CompositeScreenProps } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Ionicons } from "@expo/vector-icons";

type Props = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, "Home">,
  NativeStackScreenProps<RootStackParamList>
>;

export default function HomeScreen({ navigation }: Props) {
  const { chickens, setChickens, getEggCountForDate } = useEggEntries();
  const { user, logout } = useAuth();
  const { t, language } = useLanguage();

  const today = new Date().toLocaleDateString("sv-SE");
  const todayEggs = getEggCountForDate(today);

  const formattedToday = new Date().toLocaleDateString(
    language === "cs" ? "cs-CZ" : "en-US",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  const handleSave = async () => {
    if (!user) return;

    try {
      await saveChickenCount(user.uid, chickens);

      Alert.alert(t("home.alerts.savedTitle"), t("home.alerts.savedMessage"));
    } catch (error: any) {
      Alert.alert(
        t("home.alerts.errorTitle"),
        error?.message ?? t("home.alerts.errorMessage")
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-zinc-50">
      <View className="flex-1 px-5 pt-4 pb-24">
        <View className="mb-6 flex-row items-start justify-between">
          <View className="flex-1 pr-4">
            <Text className="text-3xl font-bold text-zinc-900">
              {t("home.title")}
            </Text>

            <Text className="mt-2 text-base text-zinc-500">
              {t("home.subtitle")}
            </Text>
          </View>

          <Pressable
            onPress={() => navigation.navigate("Settings")}
            className="rounded-2xl bg-white p-3 shadow-lg"
          >
            <Ionicons name="settings-outline" size={22} color="#18181b" />
          </Pressable>
        </View>

        <View className="rounded-[28px] bg-amber-50 px-5 py-5 shadow-lg">
          <View className="flex-row items-start justify-between">
            <View className="flex-1 pr-4">
              <Text className="text-base font-semibold uppercase tracking-wide text-amber-700">
                {t("home.chickens")}
              </Text>

              <Text className="mt-4 text-6xl font-bold text-zinc-900">
                {chickens}
              </Text>

              <Text className="mt-10 text-md text-zinc-500">
                {t("home.chickensEdit")}
              </Text>
            </View>

            <View className="items-center justify-center rounded-3xl bg-white/70 p-2">
              <Image
                source={require("../../assets/chicken.png")}
                className="h-36 w-36"
                resizeMode="contain"
              />
            </View>
          </View>

          <View className="mt-6 flex-row items-center">
            <Pressable
              onPress={() => setChickens(Math.max(0, chickens - 1))}
              className="h-12 w-12 items-center justify-center rounded-2xl bg-zinc-900"
            >
              <Text className="text-2xl font-bold text-white">-</Text>
            </Pressable>

            <View className="mx-4 flex-1 rounded-2xl bg-white px-4 py-3">
              <Text className="text-center text-xl font-semibold text-zinc-900">
                {t("home.chickensCount", { count: chickens })}
              </Text>
            </View>

            <Pressable
              onPress={() => setChickens(chickens + 1)}
              className="h-12 w-12 items-center justify-center rounded-2xl bg-zinc-900"
            >
              <Text className="text-2xl font-bold text-white">+</Text>
            </Pressable>
          </View>

          <Pressable
            onPress={handleSave}
            className="mt-5 rounded-2xl bg-blue-600 py-4"
          >
            <Text className="text-center text-lg font-semibold text-white">
              {t("home.saveChickens")}
            </Text>
          </Pressable>
        </View>

        <View className="mt-5 rounded-[28px] bg-white px-5 py-5 shadow-lg">
          <View className="flex-row items-start justify-between">
            <View className="flex-1 pr-4">
              <Text className="text-base font-semibold uppercase tracking-wide text-orange-700">
                {t("home.todayRecord")}
              </Text>

              <Text className="mt-3 text-base text-zinc-500">
                {formattedToday}
              </Text>

              <View className="mt-10 flex-row items-end">
                <Text className="text-6xl font-bold text-zinc-900">
                  {todayEggs}
                </Text>

                <Text className="ml-2 mb-1 text-lg font-medium text-zinc-500">
                  {t("home.eggs")}
                </Text>
              </View>
            </View>

            <View className="items-center justify-center rounded-3xl bg-amber-50 p-2">
              <Image
                source={require("../../assets/egg_mini.png")}
                className="h-36 w-36"
                resizeMode="contain"
              />
            </View>
          </View>

          <Pressable
            onPress={() => navigation.navigate("AddEggs", { date: today })}
            className="mt-5 rounded-2xl bg-amber-900 py-4"
          >
            <Text className="text-center text-lg font-semibold text-white">
              {t("home.editToday")}
            </Text>
          </Pressable>
        </View>

        <Pressable
          onPress={logout}
          className="mt-6 rounded-2xl bg-zinc-200 py-4"
        >
          <Text className="text-center text-base font-semibold text-zinc-900">
            {t("home.logout")}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}