import React from "react";
import {Modal, StyleSheet} from "react-native";
import BackButton from "../components/BackButton";
import {View} from "../components/Themed";

export type BaseModalProps = {
  closeModal: () => void;
  isVisible?: boolean;
  children?: React.ReactNode;
};

export default function BaseModal({
    closeModal,
    isVisible,
    children
}: BaseModalProps) {
    const closeModalCustom = () => {
        closeModal();
    };
    return (
        <Modal
            visible={isVisible}
            animationType={"fade"}
            transparent={true}
            onRequestClose={closeModal}
        >
            <View style={styles.container}>
                <BackButton style={styles.backButton} onPress={closeModalCustom} />
                {children}
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 30
    },
    backButton: {
        position: "absolute",
        top: 30,
        left: 30,
        height: 30
    }
});
