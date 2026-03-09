import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { AppState } from "react-native";

import { i18n, AppLanguage, getDeviceLanguage, setI18nLanguage } from "../i18n";
import {
  getLanguagePreference,
  setLanguagePreference,
} from "../services/settingsStorage";

type LanguageContextType = {
  language: AppLanguage;
  setLanguage: (lang: AppLanguage) => Promise<void>;
  t: typeof i18n.t;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<AppLanguage>("en");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initializeLanguage();
  }, []);

  useEffect(() => {
    const sub = AppState.addEventListener("change", async (state) => {
      if (state !== "active") return;

      const saved = await getLanguagePreference();

      // Jen když uživatel nemá vlastní volbu,
      // můžeme znovu načíst jazyk zařízení
      if (!saved) {
        const deviceLanguage = getDeviceLanguage();
        setI18nLanguage(deviceLanguage);
        setLanguageState(deviceLanguage);
      }
    });

    return () => sub.remove();
  }, []);

  const initializeLanguage = async () => {
    const saved = await getLanguagePreference();
    const resolvedLanguage = saved ?? getDeviceLanguage();

    setI18nLanguage(resolvedLanguage);
    setLanguageState(resolvedLanguage);
    setReady(true);
  };

  const setLanguage = async (lang: AppLanguage) => {
    setI18nLanguage(lang);
    setLanguageState(lang);
    await setLanguagePreference(lang);
  };

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: i18n.t.bind(i18n),
    }),
    [language]
  );

  if (!ready) return null;

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}