export function getTodayDateString() {
    return new Date().toISOString().split("T")[0];
  }