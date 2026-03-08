import { View, Text } from "react-native";

export default function InfoCard({
  label,
  primaryValue,
  secondaryValue,
  trend,
}: {
  label: string;
  primaryValue: string;
  secondaryValue: string;
  trend?: "positive" | "negative" | "neutral";
}) {
  const primaryTextColor =
    trend === "positive"
      ? "text-emerald-600"
      : trend === "negative"
        ? "text-red-600"
        : "text-zinc-900";

  return (
    <View className="flex-1 rounded-3xl bg-white p-4 shadow-lg">
      <Text className="text-sm text-zinc-500">{label}</Text>
      <Text className={`mt-2 text-base font-bold ${primaryTextColor}`}>
        {primaryValue}
      </Text>
      {!!secondaryValue && (
        <Text className="mt-1 text-base font-semibold text-amber-700">
          {secondaryValue}
        </Text>
      )}
    </View>
  );
}