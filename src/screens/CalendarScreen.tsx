import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Pressable } from "react-native";
import { Calendar } from "react-native-calendars";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { CompositeScreenProps } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootTabParamList, RootStackParamList } from "../types/navigation";
import { useEggEntries } from "../context/EggEntriesContext";

type Props = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, "CalendarTab">,
  NativeStackScreenProps<RootStackParamList>
>;

function getHeatmapColor(count: number) {
  if (count === 0) return "#ffffff";
  if (count <= 2) return "#fef3c7";
  if (count <= 5) return "#fcd34d";
  if (count <= 8) return "#f59e0b";
  return "#d97706";
}

export default function CalendarScreen({ navigation }: Props) {
  const { eggEntries } = useEggEntries();

  return (
    <SafeAreaView className="flex-1 bg-zinc-50">
      <View className="flex-1 px-5 pt-4 pb-24">
        <View className="mb-4">
          <Text className="text-3xl font-bold text-zinc-900">Kalendář</Text>
          <Text className="mt-1 text-base text-zinc-500">
            Vyber den a uprav záznam vajec
          </Text>
        </View>

        <View className="rounded-[28px] bg-white px-4 py-2 shadow-lg">
          <Calendar
            theme={{
              calendarBackground: "#ffffff",
              todayTextColor: "#2563eb",
              arrowColor: "#2563eb",
              monthTextColor: "#18181b",
              textMonthFontWeight: "700",
              textMonthFontSize: 20,
              textDayHeaderFontWeight: "600",
              textDayHeaderFontSize: 13,
              textSectionTitleColor: "#71717a",
            }}
            hideExtraDays={false}
            enableSwipeMonths
            dayComponent={({ date, state }) => {
              if (!date) return null;

              const eggCount = eggEntries[date.dateString] ?? 0;
              const isToday = state === "today";
              const isDisabled = state === "disabled";
              const heatmapColor = getHeatmapColor(eggCount);

              return (
                <Pressable
                  onPress={() =>
                    navigation.navigate("AddEggs", { date: date.dateString })
                  }
                  className="items-center justify-center rounded-2xl -my-1 px-1"
                  style={{
                    minWidth: 36,
                    minHeight: 44,
                    backgroundColor: heatmapColor,
                    borderWidth: isToday ? 2 : 0,
                    borderColor: isToday ? "#2563eb" : "transparent",
                  }}
                >
                  <Text
                    className={`text-base font-semibold ${
                      isDisabled
                        ? "text-zinc-300"
                        : isToday
                          ? "text-blue-600"
                          : "text-zinc-900"
                    }`}
                  >
                    {date.day}
                  </Text>

                  {eggCount > 0 ? (
                    <View className="mt-1 flex-row items-center rounded-full bg-white/70 px-2 my-1">
                      <Text className="text-sm font-semibold text-amber-900">
                        {eggCount}
                      </Text>
                      <Text className="ml-1 text-[10px]">🥚</Text>
                    </View>
                  ) : (
                    <Text className="mt-1 text-[10px] text-zinc-300">—</Text>
                  )}
                </Pressable>
              );
            }}
          />
        </View>
        
        <View className="mt-4 rounded-3xl bg-amber-100 p-4">
          <Text className="text-sm font-semibold uppercase tracking-wide text-amber-700">
            Tip
          </Text>
          <Text className="mt-1 text-sm leading-5 text-zinc-600">
            Klepni na libovolný den v kalendáři a můžeš upravit počet snesených
            vajec pro dané datum.
          </Text>
        </View>
        <View className="mt-1 rounded-3xl bg-amber-100 p-4">
          <Text className="text-sm font-semibold uppercase tracking-wide text-amber-700">
            Přehled
          </Text>
          <Text className="mt-1 text-sm leading-5 text-zinc-600">
            Barva dne ukazuje intenzitu snůšky. Čím tmavší pole, tím více vajec
            bylo ten den zapsáno.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
