import {MusicRoomBoxProps} from "../components/MusicRoomBox";
import AsyncStorage from "@react-native-async-storage/async-storage";


async function setMusicRooms(value: MusicRoomBoxProps[]) {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem("@music_rooms", jsonValue);
    } catch (e) {
        console.log("Could not store music rooms");
    }
}

function getMusicRooms() {
    try {
        const jsonValue = AsyncStorage.getItem("@music_rooms");
        jsonValue
            .then((value) => {
                if (value != null) {
                    return JSON.parse(value);
                } 
                return [];
                
            })
            .catch((err) => {
                console.log(err);
                return [];
            });
    } catch (e) {
        console.log(e);
        return [];
    }
}

