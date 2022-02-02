import {StyleSheet, TouchableOpacity} from "react-native";
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
    }

export default function MusicRoomBox({name, onClick}: MusicRoomBoxComponentProps) {
    return (
        <TouchableOpacity
            style={styles.musicRoomBox}
            onPress={() => onClick}
            onLongPress={() => onClick}
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
