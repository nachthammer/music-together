import {useEffect, useState} from "react";
import {StyleSheet, TextInput} from "react-native";
import {Text, View} from "../components/Themed";
import BaseModal from "./BaseModal";
import axios from "axios";
import {SongProps} from "../screens/MusicRoomScreen";
import Button from "../components/Button";
import {readUsername} from "../stores/UserStore";


type CreateMusicRoomModalProps = {
    visible?: boolean;
    music_room_uuid: string;
    addSong: (songProps: SongProps) => void;
    closeModal: () => void;
};

export default function AddSongModal({visible, music_room_uuid, addSong, closeModal}: CreateMusicRoomModalProps) {
    const [username, setUsername] = useState("");
    useEffect(() => {
        readUsername().then((value) => {
            setUsername(value);
        });
    }, []);
    const [songName, setSongName] = useState<string>("");
    const [songUrl, setSongUrl] = useState<string>("");

    const [returnedStatusCode, setReturnedStatusCode] = useState<number>(200);
    const [returnedMessage, setReturnedMessage] = useState<string>("");


    const addSongToMusicRoom = () => {
        const requestData = {
            username: username,
            uuid: music_room_uuid,
            songName: songName,
            songUrl: songUrl
        };

        axios
            .post("/api/add-song-to-room", requestData)
            .then((response) => {
                if (response.data === "Song successfully inserted") {
                    addSong({
                        name: songName,
                        songUrl: songUrl
                    });
                }
                setReturnedMessage(response.data);
                setReturnedStatusCode(response.status);
                closeModal();
            })
            .catch((err) => {
                setReturnedMessage(err.response.data);
                setReturnedStatusCode(err.statusCode);
            });
    };

    return (
        <BaseModal isVisible={visible} closeModal={closeModal}>
            <Text style={styles.title}>Create new music room</Text>
            <View style={styles.inputBox}>
                <Text style={styles.info}>Song Name</Text>
                <TextInput
                    style={styles.inputElement}
                    onChangeText={setSongName}
                    value={songName}
                    placeholder="song name"
                />
            </View>
            <View style={styles.inputBox}>
                <Text style={styles.info}>Song Url</Text>
                <TextInput
                    style={styles.inputElement}
                    onChangeText={setSongUrl}
                    value={songUrl}
                    placeholder="www.youtube.de/..."
                />
            </View>

            <View style={styles.submitButton}>
                <Button title="Add song" onPress={addSongToMusicRoom} style={{width: "100%"}}/>
            </View>
            <Text style={{color: returnedStatusCode === 200 ? "green" : "red", marginTop: 20}}>{returnedMessage}</Text>
        </BaseModal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 30
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20
    },
    info: {
        marginBottom: 15
    },
    inputElement: {
        width: "100%",
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        paddingLeft: 15
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
        width: "100%"
    },
    inputBox: {
        justifyContent: "flex-start",
        marginBottom: 20
    },
    submitButton: {
        marginTop: 10
    },
    submitText: {
        fontSize: 16
    }
});
