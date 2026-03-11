import { LocaleConfig } from "react-native-calendars";

LocaleConfig.locales.cs = {
  monthNames: [
    "leden",
    "únor",
    "březen",
    "duben",
    "květen",
    "červen",
    "červenec",
    "srpen",
    "září",
    "říjen",
    "listopad",
    "prosinec",
  ],
  monthNamesShort: [
    "led",
    "úno",
    "bře",
    "dub",
    "kvě",
    "čer",
    "čvc",
    "srp",
    "zář",
    "říj",
    "lis",
    "pro",
  ],
  dayNames: [
    "neděle",
    "pondělí",
    "úterý",
    "středa",
    "čtvrtek",
    "pátek",
    "sobota",
  ],
  dayNamesShort: ["Ne", "Po", "Út", "St", "Čt", "Pá", "So"],
  today: "Dnes",
};

LocaleConfig.locales.en = {
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  monthNamesShort: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  dayNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  today: "Today",
};

export function setCalendarLocale(language: "cs" | "en") {
  LocaleConfig.defaultLocale = language;
}