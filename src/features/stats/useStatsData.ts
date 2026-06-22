import { useMemo } from "react";
import type { FilterType } from "./statsHelper";
import type { EggEntries } from "../../context/EggEntriesContext";
import { useLanguage } from "../../context/LanguageContext";
import {
  calculateTrendPercent,
  formatWeekLabel,
  formatMonthLabel,
  getMonthKey,
  getWeekKey,
} from "./statsHelper";

type UseStatsDataParams = {
  eggEntries: EggEntries;
  chickens: number;
  filter: FilterType;
};

export function useStatsData({
  eggEntries,
  chickens,
  filter,
}: UseStatsDataParams) {
  const now = new Date();
  const { language } = useLanguage();

  const allEntriesSorted = useMemo(() => {
    return Object.entries(eggEntries).sort((a, b) => a[0].localeCompare(b[0]));
  }, [eggEntries]);

  const filteredEntries = useMemo(() => {
    return allEntriesSorted.filter(([date]) => {
      const entryDate = new Date(date);

      if (filter === "week") {
        const diffMs = now.getTime() - entryDate.getTime();
        const diffDays = diffMs / (1000 * 60 * 60 * 24);
        return diffDays >= 0 && diffDays < 7;
      }

      if (filter === "month") {
        return (
          entryDate.getFullYear() === now.getFullYear() &&
          entryDate.getMonth() === now.getMonth()
        );
      }

      return entryDate.getFullYear() === now.getFullYear();
    });
  }, [allEntriesSorted, filter, now]);

  const periodDaysCount = useMemo(() => {
    if (filter === "week") return 7;
    if (filter === "month") return now.getDate();

    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const diffMs = now.getTime() - startOfYear.getTime();
    return Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;
  }, [filter, now]);

  const stats = useMemo(() => {
    const totalEggs = filteredEntries.reduce(
      (sum, [, entry]) => sum + entry.eggs,
      0
    );

    const totalBrokenEggs = filteredEntries.reduce(
      (sum, [, entry]) => sum + entry.brokenEggs,
      0
    );

    const totalDays = filteredEntries.length;

    const productivityPercent =
      chickens > 0 && periodDaysCount > 0
        ? (totalEggs / (chickens * periodDaysCount)) * 100
        : 0;

    const avgPerChicken = chickens > 0 ? totalEggs / chickens : 0;

    const completionPercent =
      periodDaysCount > 0 ? (totalDays / periodDaysCount) * 100 : 0;

    return {
      totalEggs,
      totalBrokenEggs,
      totalDays,
      productivityPercent,
      avgPerChicken,
      completionPercent,
    };
  }, [filteredEntries, chickens, periodDaysCount]);

  const extraStats = useMemo(() => {
    const currentYearEntries = allEntriesSorted.filter(([date]) => {
      const entryDate = new Date(date);
      return entryDate.getFullYear() === now.getFullYear();
    });

    const totalThisYear = currentYearEntries.reduce(
      (sum, [, entry]) => sum + entry.eggs,
      0
    );

    const totalBrokenThisYear = currentYearEntries.reduce(
      (sum, [, entry]) => sum + entry.brokenEggs,
      0
    );

    const bestDay =
      allEntriesSorted.length > 0
        ? allEntriesSorted.reduce((best, current) =>
            current[1].eggs > best[1].eggs ? current : best
          )
        : null;

    const worstDayCandidates = allEntriesSorted.filter(
      ([, entry]) => entry.eggs > 0
    );

    const worstDay =
      worstDayCandidates.length > 0
        ? worstDayCandidates.reduce((worst, current) =>
            current[1].eggs < worst[1].eggs ? current : worst
          )
        : null;

    const weekTotals: Record<string, number> = {};
    const monthTotals: Record<string, number> = {};

    allEntriesSorted.forEach(([date, entry]) => {
      const weekKey = getWeekKey(date);
      const monthKey = getMonthKey(date);

      weekTotals[weekKey] = (weekTotals[weekKey] ?? 0) + entry.eggs;
      monthTotals[monthKey] = (monthTotals[monthKey] ?? 0) + entry.eggs;
    });

    const bestWeekEntry = Object.entries(weekTotals).reduce<
      [string, number] | null
    >((best, current) => {
      if (!best || current[1] > best[1]) return current;
      return best;
    }, null);

    const bestMonthEntry = Object.entries(monthTotals).reduce<
      [string, number] | null
    >((best, current) => {
      if (!best || current[1] > best[1]) return current;
      return best;
    }, null);

    return {
      totalThisYear,
      totalBrokenThisYear,
      bestDay,
      worstDay,
      bestWeek: bestWeekEntry,
      bestMonth: bestMonthEntry,
    };
  }, [allEntriesSorted, now]);

  const chartData = useMemo(() => {
    const locale = language === "cs" ? "cs-CZ" : "en-US";

    if (filter === "week") {
      const labels = filteredEntries.map(([date]) => {
        const d = new Date(date);
        return d.toLocaleDateString(locale, { weekday: "short" });
      });

      const eggData = filteredEntries.map(([, entry]) => entry.eggs);
      const brokenData = filteredEntries.map(([, entry]) => entry.brokenEggs);
      
      return {
        labels: labels.length > 0 ? labels : ["-"],
        datasets: [
          {
            data: eggData.length > 0 ? eggData : [0],
            color: () => "#2563eb",
          },
          {
            data: brokenData.length > 0 ? brokenData : [0],
            color: () => "#dc2626",
          },
        ],
      };
    }

    if (filter === "month") {
      const eggData = filteredEntries.map(([, entry]) => entry.eggs);
      const brokenData = filteredEntries.map(([, entry]) => entry.brokenEggs);

      const dayNumbers = filteredEntries.map(([date]) => {
        const d = new Date(date);
        return d.getDate();
      });

      const labels = dayNumbers.map((day) => {
        const lastDay = dayNumbers[dayNumbers.length - 1];
        const visibleDays = [
          1, 3, 5, 7, 9, 11, 13, 15,
          17, 19, 21, 23, 25, 27, 29, lastDay,
        ];

        return visibleDays.includes(day) ? String(day) : "";
      });

      return {
        labels: labels.length > 0 ? labels : ["-"],
        datasets: [
          {
            data: eggData.length > 0 ? eggData : [0],
            color: () => "#2563eb",
          },
          {
            data: brokenData.length > 0 ? brokenData : [0],
            color: () => "#dc2626",
          },
        ],
      };
    }

    const monthlyTotals = new Array(12).fill(0);
    const monthlyBrokenTotals = new Array(12).fill(0);

    filteredEntries.forEach(([date, entry]) => {
      const d = new Date(date);
      monthlyTotals[d.getMonth()] += entry.eggs;
      monthlyBrokenTotals[d.getMonth()] += entry.brokenEggs;
    });

    const monthLabels = Array.from({ length: 12 }, (_, index) => {
      const date = new Date(2025, index, 1);
      return date.toLocaleDateString(locale, { month: "short" });
    });

    return {
      labels: monthLabels,
      datasets: [
        {
          data: monthlyTotals,
          color: () => "#2563eb",
        },
        {
          data: monthlyBrokenTotals,
          color: () => "#dc2626",
        },
      ],
    };
  }, [filteredEntries, filter, language]);

  const trends = useMemo(() => {
    const currentWeekMonday = new Date(now);
    currentWeekMonday.setHours(0, 0, 0, 0);
    currentWeekMonday.setDate(
      currentWeekMonday.getDate() - ((currentWeekMonday.getDay() + 6) % 7)
    );

    const lastCompletedWeekStart = new Date(currentWeekMonday);
    lastCompletedWeekStart.setDate(lastCompletedWeekStart.getDate() - 7);

    const lastCompletedWeekEnd = new Date(currentWeekMonday);
    lastCompletedWeekEnd.setDate(lastCompletedWeekEnd.getDate() - 1);
    lastCompletedWeekEnd.setHours(23, 59, 59, 999);

    const previousCompletedWeekStart = new Date(currentWeekMonday);
    previousCompletedWeekStart.setDate(
      previousCompletedWeekStart.getDate() - 14
    );

    const previousCompletedWeekEnd = new Date(currentWeekMonday);
    previousCompletedWeekEnd.setDate(previousCompletedWeekEnd.getDate() - 8);
    previousCompletedWeekEnd.setHours(23, 59, 59, 999);

    const lastCompletedWeekEntries = allEntriesSorted.filter(([date]) => {
      const entryDate = new Date(date);
      return (
        entryDate >= lastCompletedWeekStart && entryDate <= lastCompletedWeekEnd
      );
    });

    const previousCompletedWeekEntries = allEntriesSorted.filter(([date]) => {
      const entryDate = new Date(date);
      return (
        entryDate >= previousCompletedWeekStart &&
        entryDate <= previousCompletedWeekEnd
      );
    });

    const lastCompletedWeekTotal = lastCompletedWeekEntries.reduce(
      (sum, [, entry]) => sum + entry.eggs,
      0
    );

    const previousCompletedWeekTotal = previousCompletedWeekEntries.reduce(
      (sum, [, entry]) => sum + entry.eggs,
      0
    );

    const weeklyTrendPercent = calculateTrendPercent(
      lastCompletedWeekTotal,
      previousCompletedWeekTotal
    );

    const lastCompletedMonth = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      1
    );

    const previousCompletedMonth = new Date(
      now.getFullYear(),
      now.getMonth() - 2,
      1
    );

    const lastCompletedMonthEntries = allEntriesSorted.filter(([date]) => {
      const entryDate = new Date(date);
      return (
        entryDate.getFullYear() === lastCompletedMonth.getFullYear() &&
        entryDate.getMonth() === lastCompletedMonth.getMonth()
      );
    });

    const previousCompletedMonthEntries = allEntriesSorted.filter(([date]) => {
      const entryDate = new Date(date);
      return (
        entryDate.getFullYear() === previousCompletedMonth.getFullYear() &&
        entryDate.getMonth() === previousCompletedMonth.getMonth()
      );
    });

    const lastCompletedMonthTotal = lastCompletedMonthEntries.reduce(
      (sum, [, entry]) => sum + entry.eggs,
      0
    );

    const previousCompletedMonthTotal = previousCompletedMonthEntries.reduce(
      (sum, [, entry]) => sum + entry.eggs,
      0
    );

    const monthlyTrendPercent = calculateTrendPercent(
      lastCompletedMonthTotal,
      previousCompletedMonthTotal
    );

    return {
      lastCompletedWeekTotal,
      previousCompletedWeekTotal,
      weeklyTrendPercent,
      lastCompletedMonthTotal,
      previousCompletedMonthTotal,
      monthlyTrendPercent,
      lastCompletedWeekLabel: formatWeekLabel(
        getWeekKey(lastCompletedWeekStart.toLocaleDateString("sv-SE"))
      ),
      previousCompletedWeekLabel: formatWeekLabel(
        getWeekKey(previousCompletedWeekStart.toLocaleDateString("sv-SE"))
      ),
      lastCompletedMonthLabel: lastCompletedMonth.toLocaleDateString(
        language === "cs" ? "cs-CZ" : "en-US",
        {
          month: "numeric",
          year: "numeric",
        }
      ),
      previousCompletedMonthLabel: previousCompletedMonth.toLocaleDateString(
        language === "cs" ? "cs-CZ" : "en-US",
        {
          month: "numeric",
          year: "numeric",
        }
      ),
    };
  }, [allEntriesSorted, now, language]);

  return {
    allEntriesSorted,
    filteredEntries,
    stats,
    extraStats,
    chartData,
    trends,
  };
}