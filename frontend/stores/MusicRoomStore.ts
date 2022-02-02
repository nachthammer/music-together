import {MusicRoomBoxProps} from "../components/MusicRoomBox";
import AsyncStorage from "@react-native-async-storage/async-storage";


export async function setMusicRooms(value: MusicRoomBoxProps[]) {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem("@music_rooms", jsonValue);
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log("Could not store music rooms");
    }
}

export function getMusicRooms() {
    try {
        const jsonValue = AsyncStorage.getItem("@music_rooms");
        jsonValue
            .then((value) => {
                if (value !== null) {
                    return JSON.parse(value);
                } 
                return [];
            })
            .catch((err) => {
                // eslint-disable-next-line no-console
                console.log(err);
                return [];
            });
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
        return [];
    }
}

export async function storeCurrentMusicRoom(value: MusicRoomBoxProps) {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem("@current_music_room", jsonValue);
    } catch (e) {
        console.log("Could not store current music.");
    }
}

export async function readCurrentMusicRoom(): Promise<MusicRoomBoxProps> {
    const defaultMusicRoom = {
        name: "",
        uuid: "",
        username: ""
    };
    try {
        const jsonValue = await AsyncStorage.getItem("@current_music_room");
        if (jsonValue !== null) {
            return JSON.parse(jsonValue);
        }
        return defaultMusicRoom;
    } catch (e) {
        console.log(e);
        return defaultMusicRoom;
    }
}





