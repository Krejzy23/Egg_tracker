import { Ionicons } from "@expo/vector-icons";
import { View, Text, Pressable } from "react-native";

export function SettingsButtonRow({
  icon,
  title,
  subtitle,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center px-5 py-4 active:opacity-80"
    >
      <View className="mr-4 rounded-2xl bg-zinc-100 p-3">
        <Ionicons name={icon} size={20} color="#18181b" />
      </View>

      <View className="flex-1">
        <Text className="text-lg font-semibold text-zinc-900">{title}</Text>
        <Text className="mt-1 text-base text-zinc-500">{subtitle}</Text>
      </View>

      <Ionicons name="chevron-forward" size={18} color="#71717a" />
    </Pressable>
  );
}
