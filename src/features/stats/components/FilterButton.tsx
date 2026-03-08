import { Pressable, Text } from "react-native";

export default function FilterButton({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={`rounded-2xl px-4 py-3 ${
        active ? "bg-blue-600" : "bg-zinc-200"
      }`}
    >
      <Text
        className={`text-sm font-semibold ${
          active ? "text-white" : "text-zinc-800"
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
}