import {useEffect, useState} from "react";
import {StyleSheet, TextInput} from "react-native";
import {Text, View} from "../components/Themed";
import BaseModal from "./BaseModal";
import axios from "axios";
import {SongProps} from "../screens/MusicRoomScreen";
import Button from "../components/Button";
import { MusicRoomBoxProps } from "../components/MusicRoomBox";
import AreYouSureModal from "./AreYouSureModal";
import {readUsername} from "../stores/UserStore";
import {readCurrentMusicRoom} from "../stores/MusicRoomStore";


type MusicRoomSettingsModalProps = {
    visible?: boolean;
    removeMusicRoom: () => void;
    closeModal: () => void;
};

export default function MusicRoomSettingsModal({visible, removeMusicRoom, closeModal}: MusicRoomSettingsModalProps) {
    const [username, setUsername] = useState("");
    useEffect(() => {
        readUsername().then((value) => {
            setUsername(value);
        });
    }, []);

    const [musicRoom, setMusicRoom] = useState<MusicRoomBoxProps>({
        name: "",
        uuid: "",
        username: ""
    });
    useEffect(() => {
        readCurrentMusicRoom().then((value) => {
            setMusicRoom(value);
        });
    }, [visible]);
    const [musicRoomName, setMusicRoomName] = useState<string>();

    const [returnedStatusCode, setReturnedStatusCode] = useState<number>(200);
    const [returnedMessage, setReturnedMessage] = useState<string>("");

    const [deleteRoomModalVisible, setDeleteRoomModalVisible] = useState<boolean>(false);

    const changeNameOfMusicRoom = () => {
        if (musicRoom.name === musicRoomName) {
            setReturnedMessage("The new name cannot be the old name.");
            setReturnedStatusCode(200);
            return;
        }
        const requestData = {
            username: username,
            uuid: musicRoom.uuid,
            newName: musicRoomName
        };

        axios
            .post("/api/change-name-of-room", requestData)
            .then((response) => {
                setReturnedMessage(response.data);
                setReturnedStatusCode(response.status);
            })
            .catch((err) => {
                setReturnedMessage(err.response.data);
                setReturnedStatusCode(err.statusCode);
            });
    };

    const deleteMusicRoom = () => {

        const requestData = {
            username: username,
            uuid: musicRoom.uuid
        };

        axios
            .post("/api/delete-music-room", requestData)
            .then((response) => {
                setReturnedMessage(response.data);
                setReturnedStatusCode(response.status);
                setDeleteRoomModalVisible(false);
                removeMusicRoom();
                closeModal();
            })
            .catch((err) => {
                setReturnedMessage(err.response.data);
                setReturnedStatusCode(err.statusCode);
            });
    };

    return (
        <BaseModal isVisible={visible} closeModal={closeModal}>
            <Text style={styles.title}>{musicRoom.name}</Text>
            <View style={styles.inputBox}>
                <Text style={styles.info}>Change music room name</Text>
                <TextInput
                    style={styles.inputElement}
                    onChangeText={setMusicRoomName}
                    value={musicRoomName}
                    placeholder="new name"
                />
            </View>


            <View style={styles.submitButton}>
                <Button title="Change name" onPress={changeNameOfMusicRoom} style={{width: "100%"}}/>
            </View>
            <View style={styles.submitButton}>
                <Button title="Delete room" onPress={() => setDeleteRoomModalVisible(true)} style={{width: "100%"}}/>
                <AreYouSureModal visible={deleteRoomModalVisible} confirm={deleteMusicRoom} cancel={() => setDeleteRoomModalVisible(false)} closeModal={closeModal}/>
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
