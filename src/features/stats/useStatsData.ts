import { useMemo } from "react";
import type { FilterType } from "./statsHelper";
import { useLanguage } from "../../context/LanguageContext";
import {
  calculateTrendPercent,
  formatWeekLabel,
  formatMonthLabel,
  getMonthKey,
  getWeekKey,
} from "./statsHelper";

type UseStatsDataParams = {
  eggEntries: Record<string, number>;
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


  /**
   * Všechny záznamy seřazené podle data vzestupně
   * Např. [["2026-03-01", 7], ["2026-03-02", 8]]
   */
  const allEntriesSorted = useMemo(() => {
    return Object.entries(eggEntries).sort((a, b) => a[0].localeCompare(b[0]));
  }, [eggEntries]);

  /**
   * Záznamy vyfiltrované podle week / month / year
   * Tyhle záznamy používáme pro hlavní cards + graf
   */
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

  /**
   * Hlavní statistiky pro zvolený filtr
   */
  const stats = useMemo(() => {
    const totalEggs = filteredEntries.reduce(
      (sum, [, count]) => sum + count,
      0
    );

    const totalDays = filteredEntries.length;

    // produktivita slepic v procentech
    const productivityPercent =
      chickens > 0 && totalDays > 0
        ? (totalEggs / chickens / totalDays) * 100
        : 0;

    const avgPerChicken = chickens > 0 ? totalEggs / chickens : 0;

    return {
      totalEggs,
      totalDays,
      productivityPercent,
      avgPerChicken,
    };
  }, [filteredEntries, chickens]);

  /**
   * Dodatečné statistiky počítané nad všemi daty
   * - celkem letos
   * - nejlepší / nejhorší den
   * - nejlepší týden
   * - nejlepší měsíc
   */
  const extraStats = useMemo(() => {
    const currentYearEntries = allEntriesSorted.filter(([date]) => {
      const entryDate = new Date(date);
      return entryDate.getFullYear() === now.getFullYear();
    });

    const totalThisYear = currentYearEntries.reduce(
      (sum, [, count]) => sum + count,
      0
    );

    const bestDay =
      allEntriesSorted.length > 0
        ? allEntriesSorted.reduce((best, current) =>
            current[1] > best[1] ? current : best
          )
        : null;

    // Nejhorší den bereme jen z reálně zadaných dnů s počtem vajec > 0
    const worstDayCandidates = allEntriesSorted.filter(
      ([, count]) => count > 0
    );

    const worstDay =
      worstDayCandidates.length > 0
        ? worstDayCandidates.reduce((worst, current) =>
            current[1] < worst[1] ? current : worst
          )
        : null;

    // Součty po týdnech a po měsících
    const weekTotals: Record<string, number> = {};
    const monthTotals: Record<string, number> = {};

    allEntriesSorted.forEach(([date, count]) => {
      const weekKey = getWeekKey(date);
      const monthKey = getMonthKey(date);

      weekTotals[weekKey] = (weekTotals[weekKey] ?? 0) + count;
      monthTotals[monthKey] = (monthTotals[monthKey] ?? 0) + count;
    });

    // Najdi nejlepší týden
    const bestWeekEntry = Object.entries(weekTotals).reduce<
      [string, number] | null
    >((best, current) => {
      if (!best || current[1] > best[1]) return current;
      return best;
    }, null);

    // Najdi nejlepší měsíc
    const bestMonthEntry = Object.entries(monthTotals).reduce<
      [string, number] | null
    >((best, current) => {
      if (!best || current[1] > best[1]) return current;
      return best;
    }, null);

    return {
      totalThisYear,
      bestDay,
      worstDay,
      bestWeek: bestWeekEntry,
      bestMonth: bestMonthEntry,
    };
  }, [allEntriesSorted, now]);

  /**
   * Data pro graf podle zvoleného filtru
   * - week: dny v týdnu
   * - month: dny v měsíci
   * - year: součty po měsících
   */
  const chartData = useMemo(() => {
    const locale = language === "cs" ? "cs-CZ" : "en-US";
  
    if (filter === "week") {
      const labels = filteredEntries.map(([date]) => {
        const d = new Date(date);
        return d.toLocaleDateString(locale, { weekday: "short" });
      });
  
      const data = filteredEntries.map(([, count]) => count);
  
      return {
        labels: labels.length > 0 ? labels : ["-"],
        datasets: [{ data: data.length > 0 ? data : [0] }],
      };
    }
  
    if (filter === "month") {
      const data = filteredEntries.map(([, count]) => count);
  
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
        datasets: [{ data: data.length > 0 ? data : [0] }],
      };
    }
  
    const monthlyTotals = new Array(12).fill(0);
  
    filteredEntries.forEach(([date, count]) => {
      const d = new Date(date);
      monthlyTotals[d.getMonth()] += count;
    });
  
    const monthLabels = Array.from({ length: 12 }, (_, index) => {
      const date = new Date(2025, index, 1);
      return date.toLocaleDateString(locale, { month: "short" });
    });
  
    return {
      labels: monthLabels,
      datasets: [{ data: monthlyTotals }],
    };
  }, [filteredEntries, filter, language]);

  /**
   * Výpočet týdenních a měsíčních trendů
   * - týdenní trend = poslední ukončený týden vs týden před ním
   * - měsíční trend = poslední ukončený měsíc vs měsíc před ním
   */
  const trends = useMemo(() => {
    // -----------------------------
    // TÝDENNÍ TREND - jen ukončené týdny
    // -----------------------------
    // pondělí aktuálního týdne
    const currentWeekMonday = new Date(now);
    currentWeekMonday.setHours(0, 0, 0, 0);
    currentWeekMonday.setDate(
      currentWeekMonday.getDate() - ((currentWeekMonday.getDay() + 6) % 7)
    );

    // poslední ukončený týden = pondělí až neděle před aktuálním týdnem
    const lastCompletedWeekStart = new Date(currentWeekMonday);
    lastCompletedWeekStart.setDate(lastCompletedWeekStart.getDate() - 7);

    const lastCompletedWeekEnd = new Date(currentWeekMonday);
    lastCompletedWeekEnd.setDate(lastCompletedWeekEnd.getDate() - 1);
    lastCompletedWeekEnd.setHours(23, 59, 59, 999);

    // týden před posledním ukončeným týdnem
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
      (sum, [, count]) => sum + count,
      0
    );

    const previousCompletedWeekTotal = previousCompletedWeekEntries.reduce(
      (sum, [, count]) => sum + count,
      0
    );

    const weeklyTrendPercent = calculateTrendPercent(
      lastCompletedWeekTotal,
      previousCompletedWeekTotal
    );

    // -----------------------------
    // MĚSÍČNÍ TREND - jen ukončené měsíce
    // -----------------------------
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
      (sum, [, count]) => sum + count,
      0
    );

    const previousCompletedMonthTotal = previousCompletedMonthEntries.reduce(
      (sum, [, count]) => sum + count,
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
      lastCompletedMonthLabel: lastCompletedMonth.toLocaleDateString("cs-CZ", {
        month: "numeric",
        year: "numeric",
      }),
      previousCompletedMonthLabel: previousCompletedMonth.toLocaleDateString(
        "cs-CZ",
        {
          month: "numeric",
          year: "numeric",
        }
      ),
    };
  }, [allEntriesSorted, now]);

  return {
    allEntriesSorted,
    filteredEntries,
    stats,
    extraStats,
    chartData,
    trends,
  };
}