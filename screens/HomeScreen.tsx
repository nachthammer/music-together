import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, TextInput } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";

import { Pressable, TouchableOpacity, Button } from "react-native";

import { Text, View } from "../components/Themed";
import {
  NavigationHelpersContext,
  useNavigation,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { MusicRoomProps } from "../components/MusicRoom";
import MusicRoom from "../components/MusicRoom";
import { retrieveMusicRoomsFromServer } from "../util";
import useUserInfos from "../hooks/useUserInfos";
import axios from "axios";

type HomeScreenProps = {
  title: string;
};

export default function HomeScreen({ title }: HomeScreenProps) {
  const { username, musicRooms, setMusicRooms, refresh } = useUserInfos();
  const navigation = useNavigation();

  useEffect(() => {
    console.log("refreshing");
    refresh;
  }, []);

  const openCreateRoomModal = () => {
    navigation.navigate("CreateMusicRoomModal");
  };

  const joinNewMusicRoom = () => {
    console.log("join new room");
  };

  return (
    <View style={styles.container}>
      <View style={styles.roomButtons}>
        <TouchableOpacity
          activeOpacity={0.95}
          style={styles.button}
          onPress={openCreateRoomModal}
        >
          <Text style={styles.buttonText}>Create a new music room</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.95}
          style={styles.button}
          onPress={joinNewMusicRoom}
        >
          <Text style={styles.buttonText}>Join a new music room</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Your music rooms: </Text>
      <View style={styles.musicRooms}>
        {musicRooms.map((props, index) => {
          <View style={styles.musicRoomBox}>
            <MusicRoom {...props} />
          </View>;
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 30,
  },
  roomButtons: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    borderRadius: 5,
    flexDirection: "row",
    height: 50,
    backgroundColor: "#ff99ff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    elevation: 0,
    width: "45%",
  },
  buttonText: {
    padding: 5,
    justifyContent: "space-evenly",
  },
  musicRooms: {
    marginTop: 20,
  },
  joinRoomButton: {
    width: "40%",
  },
  title: {
    padding: 10,
    flex: 4,
    fontSize: 20,
    fontWeight: "bold",
  },
  musicRoomBox: {
    marginBottom: 20,
  },
});
