import type { NavigatorScreenParams } from "@react-navigation/native";

export type RootTabParamList = {
  Home: undefined;
  CalendarTab: undefined;
  Stats: undefined;
};

export type CalendarStackParamList = {
  Calendar: undefined;
};

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<RootTabParamList>;
  AddEggs: { date: string };
  Settings: undefined;
};