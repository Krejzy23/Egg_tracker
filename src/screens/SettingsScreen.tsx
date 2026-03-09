import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Pressable, Switch, Alert } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useEggEntries } from "../context/EggEntriesContext";
import { exportEggEntriesToCsv } from "../features/stats/statsExport";





export default function SettingsScreen() {
  const { eggEntries } = useEggEntries();

  // Placeholder pro budoucí notifikace
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  // Placeholder pro budoucí přepínač jazyka
  const [language, setLanguage] = useState<"cs" | "en">("cs");

  const handleLanguagePress = () => {
    setLanguage((prev) => (prev === "cs" ? "en" : "cs"));
  };

  const handleNotificationsToggle = (value: boolean) => {
    setNotificationsEnabled(value);

    Alert.alert(
      "Info",
      value
        ? "Notifikace budou doplněny v další verzi aplikace."
        : "Notifikace byly vypnuty."
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-zinc-50">
      <View className="flex-1 px-5 pt-4 pb-10">
        <View className="mb-6">
          <Text className="text-3xl font-bold text-zinc-900">Nastavení</Text>
          <Text className="mt-2 text-base text-zinc-500">
            Správa aplikace, dat a budoucích funkcí
          </Text>
        </View>

        <SettingsSection title="Data">
          <SettingsButtonRow
            icon="download-outline"
            title="Export statistik do CSV"
            subtitle="Stáhne a nasdílí všechny záznamy vajec"
            onPress={() => exportEggEntriesToCsv(eggEntries)}
          />
        </SettingsSection>

        <SettingsSection title="Aplikace">
          <SettingsButtonRow
            icon="language-outline"
            title="Jazyk aplikace"
            subtitle={language === "cs" ? "🇨🇿 Čeština" : "🇬🇧 English"}
            onPress={handleLanguagePress}
          />
        </SettingsSection>

        <SettingsSection title="Upozornění">
          <SettingsSwitchRow
            icon="notifications-outline"
            title="Denní připomenutí"
            subtitle="Budoucí funkce pro připomenutí zápisu vajec"
            value={notificationsEnabled}
            onValueChange={handleNotificationsToggle}
          />
        </SettingsSection>

        <SettingsSection title="O aplikaci">
          <SettingsInfoRow
            icon="information-circle-outline"
            title="Verze aplikace"
            value="1.0.0"
          />
        </SettingsSection>
      </View>
    </SafeAreaView>
  );
}

function SettingsSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View className="mb-5">
      <Text className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500">
        {title}
      </Text>

      <View className="rounded-[28px] bg-white shadow-sm">{children}</View>
    </View>
  );
}

function SettingsButtonRow({
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

function SettingsSwitchRow({
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

function SettingsInfoRow({
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