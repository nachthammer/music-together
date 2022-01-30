import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./screens/LoginScreen";

import { Text, View } from "./components/Themed";
import { NavigationContainer } from "@react-navigation/native";
import TabOneScreen from "./screens/TabOneScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const isLoadingComplete: boolean = useCachedResources();
  const colorScheme = useColorScheme();
  const [isLoggedIn, setLogin] = useState<boolean>(false);

  const setLoginTrue = () => setLogin(true);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <NavigationContainer>
        <SafeAreaProvider>
          <Stack.Navigator initialRouteName={isLoggedIn ? "Home" : "Login"}>
            <Stack.Screen name="Home" component={TabOneScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    );
  }
}
