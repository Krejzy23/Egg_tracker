import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types/navigation";

type HeaderProps = {
  title: string;
  subtitle?: string;
  showSettings?: boolean;
  showBack?: boolean;
};

export default function Header({
  title,
  subtitle,
  showSettings = false,
  showBack = false,
}: HeaderProps) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View className="mb-4 flex-row items-start justify-between">
      <View className="flex-row items-start flex-1">

        {showBack && (
          <Pressable
            onPress={() => navigation.goBack()}
            className="mr-3 mt-1 rounded-xl bg-white p-2 shadow"
          >
            <Ionicons name="chevron-back" size={22} color="#18181b" />
          </Pressable>
        )}

        <View className="flex-1 pr-4">
          <Text className="text-3xl font-bold text-zinc-900">
            {title}
          </Text>

          {subtitle && (
            <Text className="mt-1 text-base text-zinc-500">
              {subtitle}
            </Text>
          )}
        </View>
      </View>

      {showSettings && (
        <Pressable
          onPress={() => navigation.navigate("Settings")}
          className="rounded-xl bg-blue-600 p-3 shadow-blue-600 shadow-lg"
        >
          <Ionicons name="settings-outline" size={22} color="#ffffff" />
        </Pressable>
      )}
    </View>
  );
}