import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/AuthContext";

export default function LoginScreen() {
  const { login, register } = useAuth();

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
      Alert.alert("Chyba", error?.message ?? "Něco se pokazilo");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-5 pt-6">

        {/* horní ilustrace */}
        <View className="items-center mt-10">
          <Image
            source={require("../../assets/coop.png")}
            className="h-40 w-full"
            resizeMode="contain"
          />
        </View>

        {/* nadpis */}
        <View className="mt-4 mb-6">
          <Text className="text-3xl font-bold text-zinc-900">
            Egg Tracker
          </Text>

          <Text className="mt-2 text-base text-zinc-500">
            {mode === "login"
              ? "Přihlas se do svého kurníku"
              : "Vytvoř si nový účet"}
          </Text>
        </View>

        {/* hlavní karta */}
        <View className="rounded-[28px] bg-zinc-100 px-5 py-6 shadow-lg">

          {/* inputy */}
          <View className="gap-4">
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              className="rounded-2xl bg-white px-4 py-4 text-base"
            />

            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Heslo"
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
                ? "Načítám..."
                : mode === "login"
                ? "Přihlásit se"
                : "Vytvořit účet"}
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
                ? "Nemáš účet? Zaregistruj se"
                : "Už máš účet? Přihlas se"}
            </Text>
          </Pressable>
        </View>

      </View>
    </SafeAreaView>
  );
}