import { Text, View } from "react-native";

type Props = {
  icon: string;
  title: string;
  text: string;
};

export default function GuideBulletIcon({ icon, title, text }: Props) {
  return (
    <View className="flex-row items-start rounded-2xl bg-zinc-50 px-4 py-3">
      <Text className="mr-3 text-2xl">{icon}</Text>

      <Text className="flex-1 text-base leading-6 text-zinc-600">
        <Text className="font-semibold text-zinc-800">{title}: </Text>
        {text}
      </Text>
    </View>
  );
}