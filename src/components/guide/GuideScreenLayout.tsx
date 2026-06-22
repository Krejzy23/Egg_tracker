import { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../types/navigation";

type Props = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  backLabel: string;
};

export default function GuideScreenLayout({
  title,
  subtitle,
  children,
  backLabel,
}: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView className="flex-1 bg-zinc-50">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-5 pt-4">
          <View className="mb-6 flex-row items-start justify-between">
            <View className="mr-3 flex-1">
              <Text className="text-3xl font-bold text-zinc-900">{title}</Text>

              {subtitle ? (
                <Text className="mt-2 text-base text-zinc-500">{subtitle}</Text>
              ) : null}
            </View>

            <Pressable
              onPress={() => navigation.navigate("Tabs", { screen: "Home" })}
              className="rounded-2xl bg-white p-3 shadow"
            >
              <Ionicons name="chevron-back" size={22} color="#18181b" />
            </Pressable>
          </View>

          <View className="gap-4">{children}</View>

          <Pressable
            onPress={() => navigation.navigate("Tabs", { screen: "Home" })}
            className="mt-6 rounded-2xl bg-blue-600 py-4"
          >
            <Text className="text-center text-base font-semibold text-white">
              {backLabel}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}