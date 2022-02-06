import {StyleSheet, TouchableOpacity} from "react-native";
import {Text} from "./Themed";
import React from "react";
import {storeCurrentMusicRoom} from "../storage/MusicRoomStore";

export type MusicRoomBoxProps = {
    uuid: string;
    name: string;
    username: string;
};

type MusicRoomBoxComponentProps = MusicRoomBoxProps &
    {
        onClick: () => void;
        onLongClick?: () => void;
    }

export default function MusicRoomBox({uuid, username, name, onClick, onLongClick}: MusicRoomBoxComponentProps) {

    const updateCurrentMusicRoom = () => {
        storeCurrentMusicRoom({
            uuid: uuid,
            name: name,
            username: username
        });
    };

    const goToMusicRoom = async () => {
        await updateCurrentMusicRoom();
        onClick();
    };

    const openMusicRoomSettings = async () => {
        await updateCurrentMusicRoom();
        if (onLongClick===undefined) {
            goToMusicRoom;
            return;
        }
        onLongClick();
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
