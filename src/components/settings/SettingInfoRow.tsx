import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";

export function SettingsInfoRow({
  icon,
  title,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  value: string;
}) {
  return (
    <View className="flex-row items-center px-5 py-4">
      <View className="mr-4 rounded-2xl bg-zinc-100 p-3">
        <Ionicons name={icon} size={20} color="#18181b" />
      </View>

      <View className="flex-1">
        <Text className="text-lg font-semibold text-zinc-900">{title}</Text>
      </View>

      <Text className="text-base font-medium text-zinc-500">{value}</Text>
    </View>
  );
}
