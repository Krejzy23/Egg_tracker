import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

export default function LoginScreen() {
  const { login, register } = useAuth();
  const { t } = useLanguage();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "register">("login");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      setSubmitting(true);

      if (mode === "login") {
        await login(email.trim(), password);
      } else {
        await register(email.trim(), password);
      }
    } catch (error: any) {
      Alert.alert(
        t("login.alerts.errorTitle"),
        error?.message ?? t("login.alerts.errorMessage")
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-5 pt-3">
        {/* horní ilustrace */}
        <View className="mt-4">
          <View className="flex flex-row">
            <Image
              source={require("../../assets/chicken_log2.png")}
              className="h-16 w-16 mt-32"
              resizeMode="contain"
            />
            <Image
              source={require("../../assets/coop.png")}
              className="h-56 w-56 mt-5"
              resizeMode="contain"
            />
            <Image
              source={require("../../assets/chicken_log.png")}
              className="h-32 w-32 mt-32"
              resizeMode="contain"
            />
          </View>
        </View>

        {/* nadpis */}
        <View className="mt-4 mb-6">
          <Text className="text-3xl font-bold text-zinc-900">Egg Tracker</Text>

          <Text className="mt-2 text-base text-zinc-500">
            {mode === "login"
              ? t("login.subtitleLogin")
              : t("login.subtitleRegister")}
          </Text>
        </View>

        {/* hlavní karta */}
        <View className="rounded-[28px] bg-zinc-100 px-5 py-6 shadow-lg">
          {/* inputy */}
          <View className="gap-4">
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder={t("login.emailPlaceholder")}
              autoCapitalize="none"
              keyboardType="email-address"
              className="rounded-2xl bg-white px-4 py-4 text-base"
            />

            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder={t("login.passwordPlaceholder")}
              secureTextEntry
              className="rounded-2xl bg-white px-4 py-4 text-base"
            />
          </View>

          {/* hlavní tlačítko */}
          <Pressable
            onPress={handleSubmit}
            disabled={submitting}
            className="mt-6 rounded-2xl bg-blue-600 py-4"
          >
            <Text className="text-center text-base font-semibold text-white">
              {submitting
                ? t("login.loading")
                : mode === "login"
                  ? t("login.loginButton")
                  : t("login.registerButton")}
            </Text>
          </Pressable>

          {/* přepínač login/register */}
          <Pressable
            onPress={() =>
              setMode((prev) => (prev === "login" ? "register" : "login"))
            }
            className="mt-4"
          >
            <Text className="text-center text-base font-medium text-blue-600">
              {mode === "login"
                ? t("login.switchToRegister")
                : t("login.switchToLogin")}
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
