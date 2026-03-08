import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";

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
  eggCount: number
) {
  await setDoc(
    doc(db, "users", userId, "egg_entries", date),
    {
      date,
      eggCount,
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );
}

export async function loadEggEntry(
  userId: string,
  date: string
): Promise<number> {
  const snapshot = await getDoc(doc(db, "users", userId, "egg_entries", date));

  if (!snapshot.exists()) return 0;

  const data = snapshot.data();
  return typeof data.eggCount === "number" ? data.eggCount : 0;
}

export async function loadEggEntries(
  userId: string
): Promise<Record<string, number>> {
  const snapshot = await getDocs(collection(db, "users", userId, "egg_entries"));

  const entries: Record<string, number> = {};

  snapshot.forEach((docSnapshot) => {
    const data = docSnapshot.data();
    if (typeof data.date === "string" && typeof data.eggCount === "number") {
      entries[data.date] = data.eggCount;
    }
  });

  return entries;
}