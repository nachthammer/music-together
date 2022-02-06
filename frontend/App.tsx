import {useEffect, useState} from "react";
import {SafeAreaProvider} from "react-native-safe-area-context";
import axios from "axios";
import {readUsername} from "./storage/UserStore";
import AllScreens from "./screens/AllScreens";
import {UserContextProvider} from "./stores/contexts/UserContext";
import {TrackContextProvider} from "./stores/contexts/TrackContext";
import {MusicRoomsContextProvider} from "./stores/contexts/MusicRoomsContext";
//axios.defaults.baseURL = process.env.REACT_APP_API_GATEWAY_URL;
axios.defaults.baseURL = "http://192.168.0.101:6001/";

export default function App() {
    const [username, setUsername] = useState("");
    useEffect(() => {
        readUsername()
            .then((value) => {
                setUsername(value);
            })
            .catch((err) => {
            });
    }, []);

    return (
        <UserContextProvider>
            <TrackContextProvider>
                <MusicRoomsContextProvider>

                    <AllScreens/>

                </MusicRoomsContextProvider>
            </TrackContextProvider>
        </UserContextProvider>
    );
}
