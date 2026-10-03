import "react-native-gesture-handler"
import Game from "./src/components/Game";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GamePreferencesProvider } from "./src/preferences/GamePreferencesProvider";

const App = () => (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
            <GamePreferencesProvider>
                <Game />
            </GamePreferencesProvider>
        </SafeAreaProvider>
    </GestureHandlerRootView>
);

export default App;
