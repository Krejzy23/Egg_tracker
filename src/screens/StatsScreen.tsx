import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, Dimensions, ScrollView } from "react-native";
import { useState } from "react";
import { useEggEntries } from "../context/EggEntriesContext";
import { useLanguage } from "../context/LanguageContext";
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
  const { t } = useLanguage();

  const [filter, setFilter] = useState<FilterType>("month");

  const screenWidth = Dimensions.get("window").width;

  const { stats, extraStats, chartData, trends } = useStatsData({
    eggEntries,
    chickens,
    filter,
  });

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
                {t("stats.title")}
              </Text>

              <Text className="mt-2 text-base text-zinc-500">
                {t("stats.subtitle")}
              </Text>
            </View>
          </View>

          <View className="mb-5 flex-row gap-3">
            <FilterButton
              label={t("stats.filters.week")}
              active={filter === "week"}
              onPress={() => setFilter("week")}
            />
            <FilterButton
              label={t("stats.filters.month")}
              active={filter === "month"}
              onPress={() => setFilter("month")}
            />
            <FilterButton
              label={t("stats.filters.year")}
              active={filter === "year"}
              onPress={() => setFilter("year")}
            />
          </View>

          <View className="gap-4">
            <View className="flex-row gap-4">
              <StatCard
                label={t("stats.cards.totalEggs")}
                value={stats.totalEggs.toString()}
              />
              <StatCard
                label={t("stats.cards.totalDays")}
                value={stats.totalDays.toString()}
              />
            </View>

            <View className="flex-row gap-4">
              <StatCard
                label={t("stats.cards.productivity")}
                value={`${stats.productivityPercent.toFixed(0)}%`}
              />
              <StatCard
                label={t("stats.cards.avgPerChicken")}
                value={stats.avgPerChicken.toFixed(2)}
              />
            </View>
          </View>

          <View className="mt-6 px-4 py-2">
            <Text className="text-xl font-semibold text-zinc-900">
              {t("stats.chart.title")}
            </Text>

            <Text className="mt-1 text-sm text-zinc-500">
              {t("stats.chart.subtitle")}
            </Text>

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
              {t("stats.extra.title")}
            </Text>

            <Text className="mt-1 text-sm text-zinc-500">
              {t("stats.extra.subtitle")}
            </Text>
          </View>

          <View className="mt-4 gap-4">
            <View className="flex-row gap-4">
              <InfoCard
                label={t("stats.extra.bestDay")}
                primaryValue={
                  extraStats.bestDay
                    ? extraStats.bestDay[0]
                    : t("stats.extra.noData")
                }
                secondaryValue={
                  extraStats.bestDay
                    ? `${extraStats.bestDay[1]} ${t("stats.extra.eggsSuffix")}`
                    : ""
                }
              />

              <InfoCard
                label={t("stats.extra.worstDay")}
                primaryValue={
                  extraStats.worstDay
                    ? extraStats.worstDay[0]
                    : t("stats.extra.noData")
                }
                secondaryValue={
                  extraStats.worstDay
                    ? `${extraStats.worstDay[1]} ${t("stats.extra.eggsSuffix")}`
                    : ""
                }
              />
            </View>

            <View className="flex-row gap-4">
              <InfoCard
                label={t("stats.extra.bestWeek")}
                primaryValue={
                  extraStats.bestWeek
                    ? formatWeekLabel(extraStats.bestWeek[0])
                    : t("stats.extra.noData")
                }
                secondaryValue={
                  extraStats.bestWeek
                    ? `${extraStats.bestWeek[1]} ${t("stats.extra.eggsSuffix")}`
                    : ""
                }
              />

              <InfoCard
                label={t("stats.extra.bestMonth")}
                primaryValue={
                  extraStats.bestMonth
                    ? formatMonthLabel(extraStats.bestMonth[0])
                    : t("stats.extra.noData")
                }
                secondaryValue={
                  extraStats.bestMonth
                    ? `${extraStats.bestMonth[1]} ${t("stats.extra.eggsSuffix")}`
                    : ""
                }
              />
            </View>

            <View className="flex-col gap-4">
              <InfoCard
                label={t("stats.extra.weeklyTrend")}
                primaryValue={`${trends.weeklyTrendPercent >= 0 ? "+" : ""}${trends.weeklyTrendPercent.toFixed(0)}%`}
                secondaryValue={`${trends.lastCompletedWeekLabel} vs ${trends.previousCompletedWeekLabel}`}
                trend={getTrendType(trends.weeklyTrendPercent)}
              />

              <InfoCard
                label={t("stats.extra.monthlyTrend")}
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