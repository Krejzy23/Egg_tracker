import AsyncStorage from "@react-native-async-storage/async-storage";
import type { FlockGroup } from "./flockTypes";

const FLOCK_GROUPS_KEY = "flockGroups";

export async function loadFlockGroups(): Promise<FlockGroup[]> {
  const stored = await AsyncStorage.getItem(FLOCK_GROUPS_KEY);
  return stored ? JSON.parse(stored) : [];
}

export async function saveFlockGroups(groups: FlockGroup[]) {
  await AsyncStorage.setItem(FLOCK_GROUPS_KEY, JSON.stringify(groups));
}