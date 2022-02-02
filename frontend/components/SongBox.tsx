import {StyleSheet, TouchableOpacity} from "react-native";
import {Text} from "./Themed";
import React from "react";
import {SongProps} from "../screens/MusicRoomScreen";

export type SongBoxProps = SongProps;


export default function SongBox({name, songUrl}: SongBoxProps) {

    const playSong = () => {
        console.log(`Playing song ${name} with url ${songUrl} in the background...`);
    };

    return (
        <TouchableOpacity
            style={styles.songBox}
            onPress={() => playSong}
            onLongPress={() => playSong}
        >
            <Text style={styles.songNameText}>{name}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    songBox: {
        marginBottom: 20,
        borderWidth: 1,
        height: 40,
        borderRadius: 5,
        width: 270
    },
    songNameText: {
        fontSize: 15,
        justifyContent: "center",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "auto",
        marginBottom: "auto"
    }
});
