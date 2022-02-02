import {Text, View} from "../components/Themed";
import {ScrollView, StyleSheet} from "react-native";
import Button from "../components/Button";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigation} from "@react-navigation/native";
import AddSongModal from "../modals/AddSongModal";
import SongBox from "../components/SongBox";
import {readUsername} from "../stores/UserStore";
import {readCurrentMusicRoom} from "../stores/MusicRoomStore";
import { MusicRoomBoxProps } from "../components/MusicRoomBox";

export type SongProps = {
    name: string;
    songUrl: string;
};

export type MusicRoomScreenProps = {

};

// eslint-disable-next-line no-empty-pattern
export default function MusicRoomScreen({}: MusicRoomScreenProps) {
    const navigation = useNavigation();
    const [username, setUsername] = useState("");
    useEffect(() => {
        readUsername().then((value) => {
            setUsername(value);
        });
    }, []);
    const [musicRoomProps, setMusicRoomProps] = useState<MusicRoomBoxProps>({
        name: "",
        uuid: "",
        username: ""
    });
    useEffect(() => {
        readCurrentMusicRoom().then((value) => {
            setMusicRoomProps(value);
        });
    }, [navigation]);


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
            uuid: musicRoomProps.uuid
        };
        axios
            .post("/api/get-songs-from-uuid", requestData)
            .then((response) => {
                const data = response.data;
                let allSongs: SongProps[] = [];
                for (let i = 0; i < data.length; i++) {
                    allSongs.push({
                        name: data[i][0],
                        songUrl: data[i][1]
                    });
                }
                setSongs(allSongs);
            })
            .catch(() => {

            });
    }, []);

    const addSongToRoom = (newSong: SongProps) => {
        setSongs(songs.concat(newSong));
    };

    return (
        <View style={styles.container}>
            {
                <>
                    <Button title="Add new song" onPress={openAddSongModal} style={{height: 35}}/>
                    <AddSongModal visible={addSongModalVisible} addSong={addSongToRoom} closeModal={closeAddSongModal}
                        music_room_uuid={musicRoomProps.uuid}/>
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
