import "./global.css";
import AppNavigator from "./src/navigation/AppNavigator";
import { EggEntriesProvider } from "./src/context/EggEntriesContext";
import { AuthProvider } from "./src/context/AuthContext";
import { LanguageProvider } from "./src/context/LanguageContext";

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <EggEntriesProvider>
          <AppNavigator />
        </EggEntriesProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
