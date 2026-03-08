import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export type EggEntries = Record<string, number>;

type EggEntriesContextType = {
  eggEntries: EggEntries;
  chickens: number;
  setChickens: (count: number) => void;
  setEggCountForDate: (date: string, count: number) => void;
  getEggCountForDate: (date: string) => number;
  hydrateFromFirebase: (data: {
    chickens: number;
    eggEntries: EggEntries;
  }) => void;
  clearLocalData: () => void;
};

const EggEntriesContext = createContext<EggEntriesContextType | undefined>(
  undefined
);

export function EggEntriesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [eggEntries, setEggEntries] = useState<EggEntries>({});
  const [chickens, setChickens] = useState<number>(0);

  const setEggCountForDate = useCallback((date: string, count: number) => {
    setEggEntries((prev) => ({
      ...prev,
      [date]: count,
    }));
  }, []);

  const getEggCountForDate = useCallback(
    (date: string) => {
      return eggEntries[date] ?? 0;
    },
    [eggEntries]
  );

  const hydrateFromFirebase = useCallback(
    ({
      chickens,
      eggEntries,
    }: {
      chickens: number;
      eggEntries: EggEntries;
    }) => {
      setChickens(chickens);
      setEggEntries(eggEntries);
    },
    []
  );

  const clearLocalData = useCallback(() => {
    setChickens(0);
    setEggEntries({});
  }, []);

  const value = useMemo(
    () => ({
      eggEntries,
      chickens,
      setChickens,
      setEggCountForDate,
      getEggCountForDate,
      hydrateFromFirebase,
      clearLocalData,
    }),
    [
      eggEntries,
      chickens,
      setEggCountForDate,
      getEggCountForDate,
      hydrateFromFirebase,
      clearLocalData,
    ]
  );

  return (
    <EggEntriesContext.Provider value={value}>
      {children}
    </EggEntriesContext.Provider>
  );
}

export function useEggEntries() {
  const context = useContext(EggEntriesContext);

  if (!context) {
    throw new Error("useEggEntries must be used inside EggEntriesProvider");
  }

  return context;
}