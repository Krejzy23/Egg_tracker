import { Alert } from "react-native";
import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";

export async function exportEggEntriesToCsv(
  eggEntries: Record<string, number>
) {
  try {
    const rows = Object.entries(eggEntries)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([date, eggs]) => `${date},${eggs}`);

    const csv = ["date,eggs", ...rows].join("\n");
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