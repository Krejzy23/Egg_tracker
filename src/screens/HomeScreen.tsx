import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, Pressable, Alert, Image } from "react-native";
import { useEggEntries } from "../context/EggEntriesContext";
import { useAuth } from "../context/AuthContext";
import { saveChickenCount } from "../services/firestore";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { RootTabParamList, RootStackParamList } from "../types/navigation";
import type { CompositeScreenProps } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, "Home">,
  NativeStackScreenProps<RootStackParamList>
>;

export default function HomeScreen({ navigation }: Props) {
  const { chickens, setChickens, getEggCountForDate } = useEggEntries();
  const { user, logout } = useAuth();

  const today = new Date().toLocaleDateString("sv-SE");
  const todayEggs = getEggCountForDate(today);

  const handleSave = async () => {
    if (!user) return;

    try {
      await saveChickenCount(user.uid, chickens);
      Alert.alert("Uloženo", "Počet slepic byl uložen.");
    } catch (error: any) {
      Alert.alert("Chyba", error?.message ?? "Nepodařilo se uložit data");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-zinc-50">
      <View className="flex-1 px-5 pt-4 pb-24">
        <View className="mb-6">
          <Text className="text-3xl font-bold text-zinc-900">Můj kurník</Text>
          <Text className="mt-2 text-base text-zinc-500">
            Přehled slepic a dnešní snůšky
          </Text>
        </View>

        <View className="rounded-[28px] bg-amber-50 px-5 py-5 shadow-lg">
          <View className="flex-row items-start justify-between">
            <View className="flex-1 pr-4">
              <Text className="text-base font-semibold uppercase tracking-wide text-amber-700">
                Počet slepic
              </Text>

              <Text className="mt-3 text-5xl font-bold text-zinc-900">
                {chickens}
              </Text>

              <Text className="mt-2 text-sm text-zinc-500">
                Uprav počet slepic v kurníku
              </Text>
            </View>

            <View className="items-center justify-center rounded-3xl bg-white/70 p-2">
              <Image
                source={require("../../assets/chicken.png")}
                className="h-32 w-32"
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
              <Text className="text-center text-lg font-semibold text-zinc-900">
                {chickens} slepic
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
            <Text className="text-center text-base font-semibold text-white">
              Uložit počet slepic
            </Text>
          </Pressable>
        </View>

        <View className="mt-5 rounded-[28px] bg-white px-5 py-5 shadow-lg">
          <View className="flex-row items-start justify-between">
            <View className="flex-1 pr-4">
              <Text className="text-base font-semibold uppercase tracking-wide text-orange-700">
                Dnešní záznam
              </Text>

              <Text className="mt-3 text-base text-zinc-500">{today}</Text>

              <View className="mt-4 flex-row items-end">
                <Text className="text-5xl font-bold text-zinc-900">
                  {todayEggs}
                </Text>
                <Text className="ml-2 mb-1 text-lg font-medium text-zinc-500">
                  vajec
                </Text>
              </View>
            </View>

            <View className="items-center justify-center rounded-3xl bg-amber-50 p-2">
              <Image
                source={require("../../assets/egg_mini.png")}
                className="h-32 w-32"
                resizeMode="contain"
              />
            </View>
          </View>

          <Pressable
            onPress={() => navigation.navigate("AddEggs", { date: today })}
            className="mt-5 rounded-2xl bg-amber-900 py-4"
          >
            <Text className="text-center text-base font-semibold text-white">
              Upravit dnešní záznam
            </Text>
          </Pressable>
        </View>

        <Pressable
          onPress={logout}
          className="mt-6 rounded-2xl bg-zinc-200 py-4"
        >
          <Text className="text-center text-base font-semibold text-zinc-900">
            Odhlásit se
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
