import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import type { EggEntry, EggEntries } from "../context/EggEntriesContext";

export async function saveChickenCount(userId: string, chickenCount: number) {
  await setDoc(doc(db, "users", userId), { chickenCount }, { merge: true });
}

export async function loadChickenCount(userId: string): Promise<number> {
  const snapshot = await getDoc(doc(db, "users", userId));

  if (!snapshot.exists()) return 0;

  const data = snapshot.data();
  return typeof data.chickenCount === "number" ? data.chickenCount : 0;
}

export async function saveEggEntry(
  userId: string,
  date: string,
  eggs: number,
  brokenEggs: number,
  chickens: number,
) {
  await setDoc(
    doc(db, "users", userId, "egg_entries", date),
    {
      date,
      eggs,
      brokenEggs,
      chickens,
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );
}

export async function loadEggEntry(
  userId: string,
  date: string
): Promise<EggEntry> {
  const snapshot = await getDoc(doc(db, "users", userId, "egg_entries", date));

  if (!snapshot.exists()) {
    return {
      eggs: 0,
      brokenEggs: 0,
      chickens: 0,
    };
  }

  const data = snapshot.data();

  // Nový formát
  if (typeof data.eggs === "number") {
    return {
      eggs: data.eggs,
      brokenEggs: typeof data.brokenEggs === "number" ? data.brokenEggs : 0,
      chickens: typeof data.chickens === "number" ? data.chickens : 0,
    };
  }

  // Starý formát
  if (typeof data.eggCount === "number") {
    return {
      eggs: data.eggCount,
      brokenEggs: 0,
      chickens: 0,
    };
  }

  return {
    eggs: 0,
    brokenEggs: 0,
    chickens: 0,
  };
}

export async function loadEggEntries(userId: string): Promise<EggEntries> {
  const snapshot = await getDocs(collection(db, "users", userId, "egg_entries"));

  const entries: EggEntries = {};

  snapshot.forEach((docSnapshot) => {
    const data = docSnapshot.data();
    const date =
      typeof data.date === "string" ? data.date : docSnapshot.id;

    // Nový formát
    if (typeof data.eggs === "number") {
      entries[date] = {
        eggs: data.eggs,
        brokenEggs: typeof data.brokenEggs === "number" ? data.brokenEggs : 0,
        chickens: typeof data.chickens === "number" ? data.chickens : 0,
      };
      return;
    }

    // Starý formát
    if (typeof data.eggCount === "number") {
      entries[date] = {
        eggs: data.eggCount,
        brokenEggs: 0,
        chickens: 0,
      };
    }
  });

  return entries;
}