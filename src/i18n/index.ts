import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";
import { translations } from "./translations";

export type AppLanguage = "cs" | "en";

export const i18n = new I18n(translations);

i18n.enableFallback = true;
i18n.defaultLocale = "en";
i18n.locale = "en";

export function getDeviceLanguage(): AppLanguage {
  const locale = getLocales()[0];
  const languageCode = locale?.languageCode?.toLowerCase();

  if (languageCode === "cs") return "cs";
  return "en";
}

export function setI18nLanguage(language: AppLanguage) {
  i18n.locale = language;
}