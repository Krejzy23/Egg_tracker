import "./global.css";
import AppNavigator from "./src/navigation/AppNavigator";
import { EggEntriesProvider } from "./src/context/EggEntriesContext";
import { AuthProvider } from "./src/context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <EggEntriesProvider>
        <AppNavigator />
      </EggEntriesProvider>
    </AuthProvider>
  );
}