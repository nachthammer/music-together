import {StyleSheet, TouchableOpacity, Pressable} from "react-native";
import {Text} from "./Themed";
import React from "react";

export type MusicRoomBoxProps = {
    uuid: string;
    name: string;
    username: string;
};

type MusicRoomBoxComponentProps = MusicRoomBoxProps &
    {
        onClick: (musicRoomProps: MusicRoomBoxProps) => void;
        onLongCLick?: (musicRoomProps: MusicRoomBoxProps) => void;
    }

export default function MusicRoomBox({uuid, username, name, onClick, onLongCLick}: MusicRoomBoxComponentProps) {

    const goToMusicRoom = () => {
        console.log("Go to music room");
        onClick({
            uuid: uuid,
            name: name,
            username: username
        });
    };

    const openMusicRoomSettings = () => {
        console.log("Long press on", name);
        if (onLongCLick===undefined) {
            goToMusicRoom;
            return
        }
        onLongCLick({
            uuid: uuid,
            name: name,
            username: username
        });
    };

    return (
        <TouchableOpacity
            style={styles.musicRoomBox}
            onPress={goToMusicRoom}
            onLongPress={openMusicRoomSettings}
        >
            <Text style={styles.musicNameText}>{name}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    musicNameText: {
        fontSize: 15,
        justifyContent: "center",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "auto",
        marginBottom: "auto"
    },
    musicRoomBox: {
        marginBottom: 20,
        borderWidth: 1,
        height: 40,
        borderRadius: 5
    }
});
