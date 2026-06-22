import { FlockGroup } from "../features/flock/flockTypes";

export function getAgeInMonths(dateString: string) {
    if (!dateString) return 0;

    const start = new Date(dateString);
    const now = new Date();

    return (
        (now.getFullYear() - start.getFullYear()) * 12 +
        (now.getMonth() - start.getMonth())
    );
}

export function getAverageFlockAgeInMonths(groups: FlockGroup[]) {
    const totalChickens = groups.reduce((sum, group) => sum + group.count, 0);

    if (totalChickens === 0) return 0;

    const weightedAgeSum = groups.reduce((sum, group) => {
        return sum + getAgeInMonths(group.acquiredDate) * group.count;
    }, 0);

    return weightedAgeSum / totalChickens;
}

export function getFlockAgeStatus(ageMonths: number) {
  if (ageMonths < 5) {
    return {
      text: "Hejno je mladé, snáška se teprve rozbíhá.",
      color: "text-blue-600",
    };
  }

  if (ageMonths <= 18) {
    return {
      text: "Hejno je v nejlepší snáškové kondici.",
      color: "text-green-600",
    };
  }

  if (ageMonths <= 30) {
    return {
      text: "Lehký pokles snášky je přirozený.",
      color: "text-yellow-600",
    };
  }

  return {
    text: "Starší hejno, produkce může výrazně klesat.",
      color: "text-red-600",
  };
}