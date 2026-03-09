import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  View,
  Pressable,
  Dimensions,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { useEggEntries } from "../context/EggEntriesContext";
import { LineChart, BarChart } from "react-native-chart-kit";

import {
  getTrendType,
  formatWeekLabel,
  formatMonthLabel,
  type FilterType,
} from "../features/stats/statsHelper";
import { useStatsData } from "../features/stats/useStatsData";

import FilterButton from "../features/stats/components/FilterButton";
import StatCard from "../features/stats/components/StatCard";
import InfoCard from "../features/stats/components/InfoCard";

export default function StatsScreen() {
  const { eggEntries, chickens } = useEggEntries();

  // Aktivní filtr statistik
  const [filter, setFilter] = useState<FilterType>("month");

  // Šířka zařízení pro chart
  const screenWidth = Dimensions.get("window").width;

  // Veškerá logika statistik je přesunutá do custom hooku
  const { stats, extraStats, chartData, trends } = useStatsData({
    eggEntries,
    chickens,
    filter,
  });

  // Základní konfigurace grafu
  const chartConfig = {
    backgroundColor: "#fafafa",
    backgroundGradientFrom: "#fafafa",
    backgroundGradientTo: "#fafafa",
    decimalPlaces: 0,
    barPercentage: 0.6,
    color: () => "#2563eb",
    labelColor: () => "#6b7280",
    propsForDots: {
      r: "3",
      strokeWidth: "1",
      stroke: "#2563eb",
    },
  };

  return (
    <SafeAreaView className="flex-1 bg-zinc-50">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 110 }}
      >
        <View className="px-5 pt-4">
          <View className="mb-6 flex-row items-start justify-between">
            <View className="flex-1 pr-4">
              <Text className="text-3xl font-bold text-zinc-900">
                Statistiky
              </Text>

              <Text className="mt-2 text-base text-zinc-500">
                Přehled produkce vajec
              </Text>
            </View>
          </View>

          {/* Přepínač filtru */}
          <View className="mb-5 flex-row gap-3">
            <FilterButton
              label="Týden"
              active={filter === "week"}
              onPress={() => setFilter("week")}
            />
            <FilterButton
              label="Měsíc"
              active={filter === "month"}
              onPress={() => setFilter("month")}
            />
            <FilterButton
              label="Rok"
              active={filter === "year"}
              onPress={() => setFilter("year")}
            />
          </View>

          {/* Hlavní stat cards */}
          <View className="gap-4">
            <View className="flex-row gap-4">
              <StatCard
                label="Celkem vajec"
                value={stats.totalEggs.toString()}
              />
              <StatCard
                label="Počet dnů záznamů"
                value={stats.totalDays.toString()}
              />
            </View>

            <View className="flex-row gap-4">
              <StatCard
                label="Produktivita slepic"
                value={`${stats.productivityPercent.toFixed(0)}%`}
              />
              <StatCard
                label="Průměr na slepici"
                value={stats.avgPerChicken.toFixed(2)}
              />
            </View>
          </View>

          <View className="mt-6 px-4 py-2">
            <Text className="text-xl font-semibold text-zinc-900">
              Produkce vajec
            </Text>

            <Text className="mt-1 text-sm text-zinc-500">
              Graf podle zvoleného období
            </Text>

            {/* Graf podle filtru */}
            <View className="-ml-20 mt-4">
              {filter === "year" ? (
                <BarChart
                  data={chartData}
                  width={screenWidth + 25}
                  height={240}
                  fromZero
                  showValuesOnTopOfBars
                  yAxisLabel=""
                  yAxisSuffix=""
                  chartConfig={chartConfig}
                  withHorizontalLabels={false}
                />
              ) : (
                <LineChart
                  data={chartData}
                  width={screenWidth + 25}
                  height={240}
                  fromZero
                  bezier
                  chartConfig={chartConfig}
                />
              )}
            </View>
          </View>

          <View className="mt-2">
            <Text className="text-xl font-semibold text-zinc-900">
              Další statistiky
            </Text>

            <Text className="mt-1 text-sm text-zinc-500">
              Roční přehled a nejlepší výsledky
            </Text>
          </View>

          {/* Rozšířené statistiky */}
          <View className="mt-4 gap-4">
            <View className="flex-row gap-4">
              <InfoCard
                label="📈 Nejlepší den"
                primaryValue={
                  extraStats.bestDay ? extraStats.bestDay[0] : "Žádná data"
                }
                secondaryValue={
                  extraStats.bestDay ? `${extraStats.bestDay[1]} vajec` : ""
                }
              />

              <InfoCard
                label="📉 Nejhorší den"
                primaryValue={
                  extraStats.worstDay ? extraStats.worstDay[0] : "Žádná data"
                }
                secondaryValue={
                  extraStats.worstDay ? `${extraStats.worstDay[1]} vajec` : ""
                }
              />
            </View>

            <View className="flex-row gap-4">
              <InfoCard
                label="🏆 Nejlepší týden"
                primaryValue={
                  extraStats.bestWeek
                    ? formatWeekLabel(extraStats.bestWeek[0])
                    : "Žádná data"
                }
                secondaryValue={
                  extraStats.bestWeek ? `${extraStats.bestWeek[1]} vajec` : ""
                }
              />

              <InfoCard
                label="🗓️ Nejlepší měsíc"
                primaryValue={
                  extraStats.bestMonth
                    ? formatMonthLabel(extraStats.bestMonth[0])
                    : "Žádná data"
                }
                secondaryValue={
                  extraStats.bestMonth ? `${extraStats.bestMonth[1]} vajec` : ""
                }
              />
            </View>

            <View className="flex-col gap-4">
              <InfoCard
                label="📈 Týdenní trend"
                primaryValue={`${trends.weeklyTrendPercent >= 0 ? "+" : ""}${trends.weeklyTrendPercent.toFixed(0)}%`}
                secondaryValue={`${trends.lastCompletedWeekLabel} vs ${trends.previousCompletedWeekLabel}`}
                trend={getTrendType(trends.weeklyTrendPercent)}
              />

              <InfoCard
                label="📊 Měsíční trend"
                primaryValue={`${trends.monthlyTrendPercent >= 0 ? "+" : ""}${trends.monthlyTrendPercent.toFixed(0)}%`}
                secondaryValue={`${trends.lastCompletedMonthLabel} vs ${trends.previousCompletedMonthLabel}`}
                trend={getTrendType(trends.monthlyTrendPercent)}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}