import axios from "axios";
import { MusicRoomProps } from "./components/MusicRoom";
import useUserInfos from "./hooks/useUserInfos";

export function convertError(err: any) {
  if (err.response) {
    return `${err.response.data} (status code ${err.response.status})`;
  } else if (err.request) {
    return "No response from the server received.";
  }
  return `The following error occurred: ${err.message}`;
}

export function retrieveMusicRoomsFromServer(
  username: string
): MusicRoomProps[] {
  const requestData = {
    username: username,
  };

  let musicRoomArray: MusicRoomProps[] = [];
  axios
    .post("/api/get-music-rooms", requestData)
    .then((response) => {
      const data = response.data;

      for (let i = 0; i < data.length; i++) {
        musicRoomArray.push({
          name: data[i]["musicRoomName"],
          username: username,
          uuid: data[i]["uuid"],
        });
      }
    })
    .catch((err) => {
      console.log(err.response.data);
    });
  return musicRoomArray;
}
