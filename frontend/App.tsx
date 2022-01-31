import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./screens/LoginScreen";
import CreateMusicRoomModal from "./modals/CreateMusicRoomModal";
import HomeScreen from "./screens/HomeScreen";
import { retrieveMusicRoomsFromServer } from "./util";
import { NavigationContainer } from "@react-navigation/native";
import RegisterScreen from "./screens/RegisterScreen";
import { RootStackParamList } from "./types";

import axios from "axios";
import useUserInfos from "./hooks/useUserInfos";

//axios.defaults.baseURL = process.env.REACT_APP_API_GATEWAY_URL;
axios.defaults.baseURL = "http://192.168.0.100:6001/";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const isLoadingComplete: boolean = useCachedResources();
  const colorScheme = useColorScheme();
  const [isLoggedIn, setLogin] = useState<boolean>(false);

  const { username, setUsername, musicRooms, setMusicRooms } = useUserInfos();

  const loginUser = (username: string) => {
    console.log("login user ", username);
    setLogin(true);
    setUsername(username);
    setMusicRooms(retrieveMusicRoomsFromServer(username));
  };

  const defaultRouteName = isLoggedIn ? "Home" : "Login";
  //const defaultRouteName = "CreateMusicRoomModal";

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <NavigationContainer>
        <SafeAreaProvider>
          <Stack.Navigator initialRouteName={defaultRouteName}>
            <Stack.Screen name="Home">
              {() => <HomeScreen {...{ title: "Homepage title" }} />}
            </Stack.Screen>
            <Stack.Screen name="Login">
              {() => <LoginScreen {...{ login: loginUser }} />}
            </Stack.Screen>
            <Stack.Screen name="Register">
              {() => <RegisterScreen {...{ login: loginUser }} />}
            </Stack.Screen>
            <Stack.Screen
              name="CreateMusicRoomModal"
              options={{ title: "Create New Room" }}
            >
              {() => <CreateMusicRoomModal />}
            </Stack.Screen>
          </Stack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    );
  }
}
