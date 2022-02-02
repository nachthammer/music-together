import {useState} from "react";
import {SafeAreaProvider} from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";

import {createNativeStackNavigator} from "@react-navigation/native-stack";

import LoginScreen from "./screens/LoginScreen";

import HomeScreen from "./screens/HomeScreen";
import {NavigationContainer} from "@react-navigation/native";
import RegisterScreen from "./screens/RegisterScreen";
import {RootStackParamList} from "./types";

import axios from "axios";
import {MusicRoomBoxProps} from "./components/MusicRoomBox";
import MusicRoomScreen from "./screens/MusicRoomScreen";

//axios.defaults.baseURL = process.env.REACT_APP_API_GATEWAY_URL;
axios.defaults.baseURL = "http://192.168.0.101:6001/";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    const isLoadingComplete: boolean = useCachedResources();
    const [isLoggedIn, setLogin] = useState<boolean>(false);

    const [username, setUsername] = useState("");
    const [currentMusicRoomProps, setCurrentMusicRoomProps] =
    useState<MusicRoomBoxProps>({
        uuid: "0",
        name: "Default playlist",
        username: ""
    });

    const loginUser = (usernameProp: string) => {
        //console.log("login user ", username);
        setLogin(true);
        setUsername(usernameProp);
    };

    const defaultRouteName = isLoggedIn ? "Home" : "Login";
    //const defaultRouteName = "CreateMusicRoomModal";

    if (!isLoadingComplete) {
        return null;
    } 
    return (
        <NavigationContainer>
            <SafeAreaProvider>
                <Stack.Navigator initialRouteName={defaultRouteName}>
                    <Stack.Screen name="Home">
                        {() => 
                            <HomeScreen
                                {...{
                                    title: "Homepage title",
                                    username: username,
                                    currentMusicRoomProps: currentMusicRoomProps,
                                    setMusicRoomProps: setCurrentMusicRoomProps
                                }}
                            />
                        }
                    </Stack.Screen>
                    <Stack.Screen name="Login">
                        {() => <LoginScreen {...{ login: loginUser }} />}
                    </Stack.Screen>
                    <Stack.Screen name="Register">
                        {() => <RegisterScreen {...{ login: loginUser }} />}
                    </Stack.Screen>

                    <Stack.Screen
                        name="MusicRoom"
                        options={{ title: currentMusicRoomProps.name }}
                    >
                        {() => <MusicRoomScreen {...{ ...currentMusicRoomProps, isOwner: true}} />}
                    </Stack.Screen>
                </Stack.Navigator>
            </SafeAreaProvider>
        </NavigationContainer>
    );
  
}
