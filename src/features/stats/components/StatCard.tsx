import { View, Text } from "react-native";

export default function StatCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View className="flex-1 rounded-3xl bg-white p-4 shadow-lg">
      <Text className="text-sm text-zinc-500">{label}</Text>
      <Text className="mt-2 text-3xl font-bold text-zinc-900">{value}</Text>
    </View>
  );
}