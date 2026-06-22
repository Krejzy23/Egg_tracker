import { View, Text } from "react-native";

export function SettingsSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View className="mb-5">
      <Text className="mb-3 text-base font-semibold uppercase tracking-wide text-zinc-500">
        {title}
      </Text>

      <View className="rounded-[28px] bg-white shadow-lg">{children}</View>
    </View>
  );
}
