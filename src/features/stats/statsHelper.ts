export type FilterType = "week" | "month" | "year";

export function getTrendType(
  value: number
): "positive" | "negative" | "neutral" {
  if (value > 0) return "positive";
  if (value < 0) return "negative";
  return "neutral";
}

export function calculateTrendPercent(current: number, previous: number) {
  if (previous === 0 && current === 0) return 0;
  if (previous === 0) return 100;

  return ((current - previous) / previous) * 100;
}

export function getWeekKey(dateString: string) {
  const date = new Date(dateString);
  const temp = new Date(date);

  temp.setHours(0, 0, 0, 0);
  temp.setDate(temp.getDate() + 3 - ((temp.getDay() + 6) % 7));

  const week1 = new Date(temp.getFullYear(), 0, 4);
  const weekNumber =
    1 +
    Math.round(
      ((temp.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7
    );

  return `${temp.getFullYear()}-W${String(weekNumber).padStart(2, "0")}`;
}

export function getMonthKey(dateString: string) {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

export function formatWeekLabel(weekKey: string) {
  const [year, week] = weekKey.split("-W");
  return `${Number(week)}/${year}`;
}

export function formatMonthLabel(monthKey: string) {
  const [year, month] = monthKey.split("-");
  const date = new Date(Number(year), Number(month) - 1);

  return date.toLocaleDateString("cs-CZ", {
    month: "numeric",
    year: "numeric",
  });
}