import { Ionicons } from "@expo/vector-icons";
import { View, Text, Switch } from "react-native";

export function SettingsSwitchRow({
  icon,
  title,
  subtitle,
  value,
  onValueChange,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}) {
  return (
    <View className="flex-row items-center px-5 py-4">
      <View className="mr-4 rounded-2xl bg-zinc-100 p-3">
        <Ionicons name={icon} size={20} color="#18181b" />
      </View>

      <View className="flex-1 pr-4">
        <Text className="text-lg font-semibold text-zinc-900">{title}</Text>
        <Text className="mt-1 text-base text-zinc-500">{subtitle}</Text>
      </View>

      <Switch value={value} onValueChange={onValueChange} />
    </View>
  );
}
