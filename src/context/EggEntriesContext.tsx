import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export type EggEntry = {
  eggs: number;
  brokenEggs: number;
  chickens: number;
};

export type EggEntries = Record<string, EggEntry>;

type EggEntriesContextType = {
  eggEntries: EggEntries;
  chickens: number;
  setChickens: (count: number) => void;

  setEggCountForDate: (date: string, count: number) => void;
  getEggCountForDate: (date: string) => number;

  setEggEntryForDate: (date: string, entry: EggEntry) => void;
  getEggEntryForDate: (date: string) => EggEntry;
  getBrokenEggCountForDate: (date: string) => number;

  hydrateFromFirebase: (data: {
    chickens: number;
    eggEntries: EggEntries;
  }) => void;
  clearLocalData: () => void;
};

const EMPTY_ENTRY: EggEntry = {
  eggs: 0,
  brokenEggs: 0,
  chickens: 0,
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

  const setEggEntryForDate = useCallback((date: string, entry: EggEntry) => {
    setEggEntries((prev) => ({
      ...prev,
      [date]: {
        eggs: entry.eggs,
        brokenEggs: entry.brokenEggs,
        chickens: entry.chickens,
      },
    }));
  }, []);

  const getEggEntryForDate = useCallback(
    (date: string) => {
      return eggEntries[date] ?? EMPTY_ENTRY;
    },
    [eggEntries]
  );

  // Zachováno kvůli starším částem aplikace
  const setEggCountForDate = useCallback((date: string, count: number) => {
    setEggEntries((prev) => ({
      ...prev,
      [date]: {
        eggs: count,
        brokenEggs: prev[date]?.brokenEggs ?? 0,
        chickens: prev[date]?.chickens ?? chickens,
      },
    }));
  }, [chickens]);

  const getEggCountForDate = useCallback(
    (date: string) => {
      return eggEntries[date]?.eggs ?? 0;
    },
    [eggEntries]
  );

  const getBrokenEggCountForDate = useCallback(
    (date: string) => {
      return eggEntries[date]?.brokenEggs ?? 0;
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
      setEggEntryForDate,
      getEggEntryForDate,
      getBrokenEggCountForDate,
      hydrateFromFirebase,
      clearLocalData,
    }),
    [
      eggEntries,
      chickens,
      setEggCountForDate,
      getEggCountForDate,
      setEggEntryForDate,
      getEggEntryForDate,
      getBrokenEggCountForDate,
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