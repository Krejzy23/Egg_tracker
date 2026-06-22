import { ReactNode } from "react";
import { View, Text } from "react-native";

type Props = {
  title: string;
  children: ReactNode;
};

export default function GuideSection({ title, children }: Props) {
  return (
    <View className="rounded-[28px] bg-white px-5 py-5 shadow-sm">
      <Text className="text-lg font-semibold text-zinc-900">{title}</Text>
      <View className="mt-1">{children}</View>
    </View>
  );
};