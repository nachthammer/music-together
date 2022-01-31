import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { MusicRoomProps } from "../components/MusicRoom";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function useUserInfos() {
  const [username, setUsernameHook] = useState<string>("");
  const [musicRooms, setMusicRoomsHook] = useState<MusicRoomProps[]>([]);

  useEffect(() => {
    console.log("useffect");
    getMusicRooms();
    getUsername();
  }, []);

  const setUsername = async (username: string) => {
    try {
      await AsyncStorage.setItem("@username", username);
    } catch (e) {
      console.error("Could not store username");
    }
  };

  function getUsername() {
    try {
      const value = AsyncStorage.getItem("@username");
      value.then((username) => {
        console.log(username);
        setUsernameHook(username ?? "");
      });
    } catch (e) {
      console.log("Could not read username from storage");
    }
  }

  const setMusicRooms = async (value: MusicRoomProps[]) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@music_rooms", jsonValue);
    } catch (e) {
      console.log("Could not store music rooms");
    }
  };

  function getMusicRooms() {
    try {
      const jsonValue = AsyncStorage.getItem("@music_rooms");
      jsonValue
        .then((value) => {
          value != null
            ? setMusicRoomsHook(JSON.parse(value))
            : setMusicRoomsHook([]);
        })
        .catch((err) => {
          setMusicRoomsHook([]);
        });
    } catch (e) {
      console.log("Could not get music rooms");
      setMusicRoomsHook([]);
    }
  }

  function refresh() {
    console.log("refresh");
    getMusicRooms();
    getUsername();

    const requestData = {
      username: username,
    };

    let musicRoomArray: MusicRoomProps[] = [];
    axios
      .post("/api/get-music-rooms", requestData)
      .then((response) => {
        const data = response.data;
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          musicRoomArray.push({
            name: data[i]["musicRoomName"],
            username: username,
            uuid: data[i]["uuid"],
          });
        }
        setMusicRoomsHook(musicRoomArray);
      })
      .catch((err) => {
        console.log("error", err.response.data);
      });
  }

  return { username, setUsername, musicRooms, setMusicRooms, refresh };
}
