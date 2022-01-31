import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Platform, StyleSheet, TextInput } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";

import { Pressable, TouchableOpacity } from "react-native";

import { Text, View, Button } from "../components/Themed";
import {
  NavigationHelpersContext,
  useNavigation,
} from "@react-navigation/native";

import axios from "axios";
import { convertError } from "../util";
import useUserInfos from "../hooks/useUserInfos";
import { MusicRoomProps } from "../components/MusicRoom";

type CreateMusicRoomModalProps = {};

export default function CreateMusicRoomModal({}: CreateMusicRoomModalProps) {
  const { username, musicRooms, setMusicRooms } = useUserInfos();
  const navigation = useNavigation();
  const [musicRoomName, setMusicRoomName] = useState<string>("");

  const [createMusicRoomFailedText, setCreateMusicRoomFailedText] =
    useState<string>("");

  const [creatingFailed, setCreatingFailed] = useState<boolean>(false);
  const [createSucceeded, setCreateSucceeded] = useState<boolean>(false);

  const createNewMusicRoom = () => {
    console.log("create new room for user", username);
    const requestData = {
      username: username,
      musicRoomName: musicRoomName,
    };

    axios
      .post("/api/create-music-room", requestData)
      .then((response) => {
        const newMusicRoom: MusicRoomProps = {
          uuid: response.data,
          name: musicRoomName,
          username: username,
        };
        setMusicRooms(musicRooms.concat(newMusicRoom));
        setCreatingFailed(false);
        setCreateSucceeded(true);
      })
      .catch((err) => {
        setCreateMusicRoomFailedText(err.response.data);
        setCreatingFailed(true);
        setCreateSucceeded(false);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create new music room</Text>
      <View style={styles.inputBox}>
        <Text style={styles.info}>Music room name</Text>
        <TextInput
          style={styles.inputElement}
          onChangeText={setMusicRoomName}
          value={musicRoomName}
          placeholder="music room name"
        ></TextInput>
      </View>

      <View style={styles.submitButton}>
        <TouchableOpacity
          activeOpacity={0.95}
          style={styles.button}
          onPress={createNewMusicRoom}
        >
          <Text style={styles.submitText}>Create a new room</Text>
        </TouchableOpacity>
      </View>
      {creatingFailed && createMusicRoomFailedText !== "" && (
        <View style={styles.failedMessage}>
          <Text style={styles.failedMessageText}>
            {createMusicRoomFailedText}
          </Text>
        </View>
      )}
      {createSucceeded && (
        <View style={styles.succeededMessage}>
          <Text style={styles.succeededMessageText}>
            {"Music room successfully added"}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  info: {
    marginBottom: 15,
  },
  inputElement: {
    width: "100%",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    paddingLeft: 15,
  },
  button: {
    borderRadius: 5,
    flexDirection: "row",
    height: 50,
    backgroundColor: "#ff99ff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    elevation: 3,
    width: "100%",
  },
  inputBox: {
    justifyContent: "flex-start",
    marginBottom: 20,
  },
  submitButton: {
    marginTop: 10,
  },
  submitText: {
    fontSize: 16,
  },
  failedMessage: {
    marginTop: 20,
  },
  failedMessageText: {
    color: "red",
  },
  succeededMessage: {
    marginTop: 20,
  },
  succeededMessageText: {
    color: "green",
  },
});
