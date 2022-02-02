import {Text, View} from "../components/Themed";
import {ScrollView, StyleSheet} from "react-native";
import Button from "../components/Button";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigation} from "@react-navigation/native";
import AddSongModal from "../modals/AddSongModal";
import SongBox from "../components/SongBox";

export type SongProps = {
    name: string;
    songUrl: string;
};

export type MusicRoomScreenProps = {
    uuid: string;
    name: string;
    username: string;
    isOwner?: boolean;
};

export default function MusicRoomScreen({
    uuid,
    username,
    isOwner
}: MusicRoomScreenProps) {
    const [songs, setSongs] = useState<SongProps[]>([]);

    const [addSongModalVisible, setAddSongModalVisible] = useState<boolean>(false);

    const openAddSongModal = () => {
        setAddSongModalVisible(true);
    };

    const closeAddSongModal = () => {
        setAddSongModalVisible(false);
    };

    useEffect(() => {
        const requestData = {
            username: username,
            uuid: uuid
        };
        axios
            .post("/api/get-songs-from-uuid", requestData)
            .then((response) => {
                const data = response.data;
                console.log("gotten songs", response.data);
                let allSongs: SongProps[] = [];
                for (let i = 0; i < data.length; i++) {
                    allSongs.push({
                        name: data[i][0],
                        songUrl: data[i][1]
                    });
                }
                setSongs(allSongs);
                console.log(allSongs);
            })
            .catch(() => {

            });
    }, []);

    const addSongToRoom = (newSong: SongProps) => {
        console.log("addSongToRoom");
        setSongs(songs.concat(newSong));
        console.log("songs", songs);
    };

    return (
        <View style={styles.container}>
            {isOwner && 
                <>
                    <Button title="Add new song" onPress={openAddSongModal} style={{height: 35}}/>
                    <AddSongModal visible={addSongModalVisible} addSong={addSongToRoom} closeModal={closeAddSongModal}
                        music_room_uuid={uuid} username={username}/>
                </>

            }
            <Text style={{fontSize: 16, marginTop: 10}}>Current available songs:</Text>
            <ScrollView style={styles.scrollView}>
                {songs.map((props, index) => 
                    <SongBox {...props} key={index}/>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    scrollView: {
        marginTop: 10
    }
});
