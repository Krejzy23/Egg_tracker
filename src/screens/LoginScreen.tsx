import { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  Text,
  TextInput,
  View,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
} from "react-native";
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
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showEvent =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const showSub = Keyboard.addListener(showEvent, () =>
      setKeyboardVisible(true)
    );
    const hideSub = Keyboard.addListener(hideEvent, () =>
      setKeyboardVisible(false)
    );

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const getAuthErrorMessage = (code?: string) => {
    switch (code) {
      case "auth/invalid-email":
        return t("login.errors.invalidEmail");
      case "auth/user-not-found":
        return t("login.errors.userNotFound");
      case "auth/wrong-password":
        return t("login.errors.wrongPassword");
      case "auth/email-already-in-use":
        return t("login.errors.emailInUse");
      case "auth/weak-password":
        return t("login.errors.weakPassword");
      case "auth/invalid-credential":
        return t("login.errors.invalidCredential");
      case "auth/missing-password":
        return t("login.errors.missingPassword");
      case "auth/too-many-requests":
        return t("login.errors.tooManyRequests");
      default:
        return t("login.alerts.errorMessage");
    }
  };

  const handleSubmit = async () => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      Alert.alert(
        t("login.alerts.errorTitle"),
        t("login.errors.invalidEmail")
      );
      return;
    }

    if (!password.trim()) {
      Alert.alert(
        t("login.alerts.errorTitle"),
        t("login.errors.missingPassword")
      );
      return;
    }

    try {
      setSubmitting(true);

      if (mode === "login") {
        await login(trimmedEmail, password);
      } else {
        await register(trimmedEmail, password);
      }
    } catch (error: any) {
      Alert.alert(
        t("login.alerts.errorTitle"),
        getAuthErrorMessage(error?.code)
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
        >
          <View className={`flex-1 px-5 ${keyboardVisible ? "pt-8" : "pt-20"}`}>
            <View className={keyboardVisible ? "mt-0" : "mt-4"}>
              <View className="flex-row items-end justify-center">
                <Image
                  source={require("../../assets/chicken_log2.png")}
                  className={keyboardVisible ? "mb-2 h-10 w-10" : "mt-48 h-16 w-16"}
                  resizeMode="contain"
                />
                <Image
                  source={require("../../assets/coop.png")}
                  className={keyboardVisible ? "h-40 w-40" : "h-72 w-72"}
                  resizeMode="contain"
                />
                <Image
                  source={require("../../assets/chicken_log.png")}
                  className={keyboardVisible ? "mb-2 h-16 w-16" : "mt-56 h-32 w-32"}
                  resizeMode="contain"
                />
              </View>
            </View>

            <View className={keyboardVisible ? "mb-5 mt-3" : "mb-6 mt-4"}>
              <Text className="text-4xl font-bold text-zinc-900">
                Egg Tracker
              </Text>

              <Text className="mt-2 text-lg text-zinc-500">
                {mode === "login"
                  ? t("login.subtitleLogin")
                  : t("login.subtitleRegister")}
              </Text>
            </View>

            <View className="rounded-[28px] bg-zinc-100 px-5 py-6 shadow-lg">
              <View className="gap-4">
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder={t("login.emailPlaceholder")}
                  placeholderTextColor="#71717a"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  className="rounded-2xl bg-white px-4 py-4 text-base"
                  style={{ color: "#18181b" }}
                  returnKeyType="next"
                />

                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder={t("login.passwordPlaceholder")}
                  placeholderTextColor="#71717a"
                  secureTextEntry
                  className="rounded-2xl bg-white px-4 py-4 text-base"
                  style={{ color: "#18181b" }}
                  returnKeyType="done"
                  onSubmitEditing={handleSubmit}
                />
              </View>

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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}