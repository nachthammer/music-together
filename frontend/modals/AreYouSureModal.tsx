import {useState} from "react";
import {StyleSheet, TextInput} from "react-native";
import {Text, View} from "../components/Themed";
import BaseModal from "./BaseModal";
import axios from "axios";
import {SongProps} from "../screens/MusicRoomScreen";
import Button from "../components/Button";


type AreYouSureModalProps = {
    visible?: boolean;
    message?: string;
    confirm: () => void;
    cancel: () => void;
    confirmMessage?: string;
    cancelMessage?: string;
};

export default function AreYouSureModal({visible, message, confirm, cancel, confirmMessage, cancelMessage}: AreYouSureModalProps) {

    return (
        <BaseModal isVisible={visible} closeModal={confirm}>
            <Text style={styles.title}>{message ?? "Are you sure?"}</Text>
            <View style={styles.roomButtons}>
                <Button title={confirmMessage ?? "Yes"} onPress={confirm} style={styles.button}></Button>
                <Button title={cancelMessage ?? "Cancel"} onPress={cancel} style={styles.button}></Button>
            </View>
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
        fontSize:20
    },
    roomButtons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around"
    },
    button: {
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        width: "45%"
    }
});
