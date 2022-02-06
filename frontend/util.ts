import axios from "axios";
import {MusicRoomBoxProps} from "./components/MusicRoomBox";
import {readUsername} from "./storage/UserStore";

export async function retrieveMusicRoomsFromServer(
    username: string
): Promise<MusicRoomBoxProps[]> {
    const requestData = {
        username: username
    };

    const response = await axios.post("/api/get-music-rooms", requestData);

    const data = response.data;
    let musicRoomArray: MusicRoomBoxProps[] = [];
    for (let i = 0; i < data.length; i++) {
        musicRoomArray.push({
            name: data[i]["musicRoomName"],
            username: username,
            uuid: data[i]["uuid"]
        });
    }
    return musicRoomArray;
}

export function isLoggedIn() {
    readUsername()
        .then((username) => {
            return username !== "";
        })
        .catch((err) => {
            return false;
        });
    return false;
}
