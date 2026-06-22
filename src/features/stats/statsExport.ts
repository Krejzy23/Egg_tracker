import { Alert } from "react-native";
import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import type { EggEntries } from "../../context/EggEntriesContext";

export async function exportEggEntriesToCsv(eggEntries: EggEntries) {
  try {
    const rows = Object.entries(eggEntries)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(
        ([date, entry]) =>
          `${date},${entry.eggs},${entry.brokenEggs}`
      );

    const csv = ["date,eggs,brokenEggs", ...rows].join("\n");
    const fileUri = `${FileSystem.cacheDirectory}egg-tracker-export.csv`;

    await FileSystem.writeAsStringAsync(fileUri, csv, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    const isAvailable = await Sharing.isAvailableAsync();

    if (!isAvailable) {
      Alert.alert("Chyba", "Sdílení není na tomto zařízení dostupné.");
      return;
    }

    await Sharing.shareAsync(fileUri, {
      mimeType: "text/csv",
      dialogTitle: "Export dat do CSV",
      UTI: "public.comma-separated-values-text",
    });
  } catch (error: any) {
    Alert.alert("Chyba", error?.message ?? "Export CSV se nepodařil.");
  }
}