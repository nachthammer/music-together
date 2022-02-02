import {StyleSheet} from "react-native";
import {Text, View} from "../components/Themed";
import BaseModal from "./BaseModal";
import Button from "../components/Button";


type AreYouSureModalProps = {
    visible?: boolean;
    message?: string;
    confirm: () => void;
    cancel: () => void;
    confirmMessage?: string;
    cancelMessage?: string;
    closeModal: () => void;
};

export default function AreYouSureModal({visible, message, confirm, cancel, confirmMessage, cancelMessage, closeModal}: AreYouSureModalProps) {
    return (
        <BaseModal isVisible={visible} closeModal={closeModal}>
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
