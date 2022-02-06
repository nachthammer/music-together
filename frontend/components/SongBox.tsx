import {StyleSheet, TouchableOpacity} from "react-native";
import {Text} from "./Themed";
import React, {useState} from "react";
import {SongProps} from "../screens/MusicRoomScreen";
import SongSettingsModal from "../modals/SongSettingsModal";

export type SongBoxProps = SongProps;

export default function SongBox({
    name,
    songUrl,
    musicRoomUuid
}: SongBoxProps) {
    const [musicSettingsVisible, setMusicSettingsVisible] =
    useState<boolean>(false);
    const playSong = () => {
    /**
        Play this song instantly (remove every else song from the playlist)
    */
        // eslint-disable-next-line no-console
        console.log(
            `Playing song ${name} with url ${songUrl} in the background...`
        );
    };

    /**
   * Open a song modal where you can remove the song and add the song to the tracklist without instantly play it (queue)
   */
    const openSongSettings = async () => {
        setMusicSettingsVisible(true);
    };

    const removeSong = () => {};

    const addSongToQueue = () => {};

    return (
        <>
            <TouchableOpacity
                style={styles.songBox}
                onPress={() => playSong}
                onLongPress={() => openSongSettings}
            >
                <Text style={styles.songNameText}>{name}</Text>
            </TouchableOpacity>
            <SongSettingsModal
                visible={musicSettingsVisible}
                songProps={{
                    name: name,
                    songUrl: songUrl,
                    musicRoomUuid: musicRoomUuid
                }}
                removeSong={removeSong}
                addSongToQueue={addSongToQueue}
                closeModal={() => setMusicSettingsVisible(false)}
            />
        </>
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
