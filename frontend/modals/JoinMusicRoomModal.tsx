import {useState} from "react";
import {StyleSheet, TextInput} from "react-native";
import {Text, View} from "../components/Themed";
import BaseModal from "./BaseModal";
import axios from "axios";
import {MusicRoomBoxProps} from "../components/MusicRoomBox";
import Button from "../components/Button";

type CreateMusicRoomModalProps = {
  username: string;
  visible?: boolean;
  joinMusicRoom: (musicRoom: MusicRoomBoxProps) => void;
  closeModal: () => void;
};

export default function CreateMusicRoomModal({
    username,
    visible,
    joinMusicRoom,
    closeModal
}: CreateMusicRoomModalProps) {
    const [musicRoomUUID, setMusicRoomUUID] = useState<string>("");

    const [createMusicRoomFailedText, setCreateMusicRoomFailedText] =
      useState<string>("");

    const [creatingFailed, setCreatingFailed] = useState<boolean>(false);
    const [createSucceeded, setCreateSucceeded] = useState<boolean>(false);

    const joinNewMusicRoom = () => {
        console.log("join new room for user", username);
        const requestData = {
            username: username,
            musicRoomName: musicRoomUUID
        };

        axios
            .post("/api/join-music-room", requestData)
            .then((response) => {
                const joinedMusicRoom: MusicRoomBoxProps = {
                    uuid: response.data.uuid,
                    name: response.data.name,
                    username: username
                };
                joinMusicRoom(joinedMusicRoom);
                setCreatingFailed(false);
                setCreateSucceeded(true);
            })
            .catch((err) => {
                setCreateMusicRoomFailedText(err.response.data);
                setCreatingFailed(true);
                setCreateSucceeded(false);
            });
    };

    return (
        <BaseModal isVisible={visible} closeModal={closeModal}>
            <Text style={styles.title}>Join new music room</Text>
            <View style={styles.inputBox}>
                <Text style={styles.info}>Music room name</Text>
                <TextInput
                    style={styles.inputElement}
                    onChangeText={setMusicRoomUUID}
                    value={musicRoomUUID}
                    placeholder="music room name"
                />
            </View>

            <View style={styles.submitButton}>
                <Button title={"Join a new room"} onPress={joinNewMusicRoom} style={{width: "100%"}}/>
            </View>
            {creatingFailed && createMusicRoomFailedText !== "" &&
            <View style={{marginTop: 20}}>
                <Text style={{color: "red"}}>
                    {createMusicRoomFailedText}
                </Text>
            </View>
            }
            {createSucceeded &&
            <View style={{marginTop: 20}}>
                <Text style={{color: "green"}}>
                    {"Music room successfully joined"}
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
    },
    submitText: {
        fontSize: 16
    }
});
