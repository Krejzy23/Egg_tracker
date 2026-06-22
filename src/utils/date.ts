export function getTodayDateString() {
  return new Date().toISOString().split("T")[0];
}

export function getAgeInMonths(dateString: string) {
  if (!dateString) return 0;

  const start = new Date(dateString);
  const now = new Date();

  return (
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth())
  );
}