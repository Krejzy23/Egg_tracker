import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import CalendarScreen from "../screens/CalendarScreen";
import StatsScreen from "../screens/StatsScreen";
import AddEggsScreen from "../screens/AddEggsScreen";
import LoginScreen from "../screens/LoginScreen";

import type { RootTabParamList, RootStackParamList } from "../types/navigation";
import { useAuth } from "../context/AuthContext";
import { useEggEntries } from "../context/EggEntriesContext";
import { loadChickenCount, loadEggEntries } from "../services/firestore";

const Tab = createBottomTabNavigator<RootTabParamList>();
const RootStack = createNativeStackNavigator<RootStackParamList>();

function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#d97706",
        tabBarInactiveTintColor: "#71717a",
        tabBarStyle: {
          height: 80,
          paddingTop: 8,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          position: "absolute",
          shadowOpacity: 0.08,
          shadowRadius: 16,
          paddingBottom: 10,
          backgroundColor: "#fffbeb",
        },
        tabBarLabelStyle: {
          fontSize: 15,
          fontWeight: "600",
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "ellipse";

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "CalendarTab") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "Stats") {
            iconName = focused ? "bar-chart" : "bar-chart-outline";
          }

          return <Ionicons name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Domů" }}
      />
      <Tab.Screen
        name="CalendarTab"
        component={CalendarScreen}
        options={{ title: "Kalendář" }}
      />
      <Tab.Screen
        name="Stats"
        component={StatsScreen}
        options={{ title: "Statistiky" }}
      />
    </Tab.Navigator>
  );
}

function AuthenticatedApp() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="Tabs"
        component={AppTabs}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="AddEggs"
        component={AddEggsScreen}
        options={{
          title: "Záznam vajec",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "#fafafa" },
          headerTitleStyle: { fontWeight: "700" },
        }}
      />
    </RootStack.Navigator>
  );
}

export default function AppNavigator() {
  const { user, loading } = useAuth();
  const { hydrateFromFirebase, clearLocalData } = useEggEntries();
  const [hydrating, setHydrating] = useState(false);

  useEffect(() => {
    const run = async () => {
      if (!user) {
        clearLocalData();
        return;
      }

      try {
        setHydrating(true);

        const [chickens, eggEntries] = await Promise.all([
          loadChickenCount(user.uid),
          loadEggEntries(user.uid),
        ]);

        hydrateFromFirebase({
          chickens,
          eggEntries,
        });
      } catch (error) {
        console.error("Failed to hydrate Firebase data:", error);
      } finally {
        setHydrating(false);
      }
    };

    run();
  }, [user, hydrateFromFirebase, clearLocalData]);

  if (loading || hydrating) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <AuthenticatedApp /> : <LoginScreen />}
    </NavigationContainer>
  );
}
