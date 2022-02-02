import {useEffect, useState} from "react";
import {StyleSheet, TextInput} from "react-native";
import {Text, View} from "../components/Themed";
import BaseModal from "./BaseModal";
import axios from "axios";
import {MusicRoomBoxProps} from "../components/MusicRoomBox";
import Button from "../components/Button";
import {readUsername} from "../stores/UserStore";

type CreateMusicRoomModalProps = {
    visible?: boolean;
    addMusicRoom: (musicRoom: MusicRoomBoxProps) => void;
    closeModal: () => void;
};

export default function CreateMusicRoomModal({
    visible,
    addMusicRoom,
    closeModal
}: CreateMusicRoomModalProps) {
    const [username, setUsername] = useState("");
    useEffect(() => {
        readUsername().then((value) => {
            setUsername(value);
        });
    }, []);

    const [musicRoomName, setMusicRoomName] = useState<string>("");

    const [createMusicRoomFailedText, setCreateMusicRoomFailedText] =
        useState<string>("");

    const [creatingFailed, setCreatingFailed] = useState<boolean>(false);
    const [createSucceeded, setCreateSucceeded] = useState<boolean>(false);

    const createNewMusicRoom = () => {
        const requestData = {
            username: username,
            musicRoomName: musicRoomName
        };

        axios
            .post("/api/create-music-room", requestData)
            .then((response) => {
                const newMusicRoom: MusicRoomBoxProps = {
                    uuid: response.data,
                    name: musicRoomName,
                    username: username
                };
                addMusicRoom(newMusicRoom);
                setCreatingFailed(false);
                setCreateSucceeded(true);
                closeModal();
                setCreateSucceeded(false);
                setMusicRoomName("");
            })
            .catch((err) => {
                setCreateMusicRoomFailedText(err.response.data);
                setCreatingFailed(true);
                setCreateSucceeded(false);
            });
    };

    return (
        <BaseModal isVisible={visible} closeModal={closeModal}>
            <Text style={styles.title}>Create a new music room</Text>
            <View style={styles.inputBox}>
                <Text style={styles.info}>Music room name</Text>
                <TextInput
                    style={styles.inputElement}
                    onChangeText={setMusicRoomName}
                    value={musicRoomName}
                    placeholder="music room name"
                />
            </View>

            <View style={styles.submitButton}>
                <Button title={"Create a new room"} onPress={createNewMusicRoom} style={{width: "100%"}}/>
            </View>
            {creatingFailed && createMusicRoomFailedText !== "" && 
                <View style={{marginTop: 10}}>
                    <Text style={{color: "red"}}>
                        {createMusicRoomFailedText}
                    </Text>
                </View>
            }
            {createSucceeded && 
                <View style={{marginTop: 10}}>
                    <Text style={{color: "green"}}>
                        {"Music room successfully created"}
                    </Text>
                </View>
            }
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
    }
});
