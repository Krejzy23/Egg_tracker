// src/components/guide/GuideSubsection.tsx
import { ReactNode } from "react";
import { View, Text } from "react-native";

type Props = {
  title: string;
  children: ReactNode;
};

export default function GuideSubsection({ title, children }: Props) {
  return (
    <View className="rounded-[28px] bg-white px-5 py-5 shadow-lg">
      <Text className="px-5 text-lg font-semibold text-zinc-800">{title}</Text>
      <View className="gap-2">{children}</View>
    </View>
  );
}