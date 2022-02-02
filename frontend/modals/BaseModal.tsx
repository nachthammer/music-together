import React from "react";
import {Modal, StyleSheet} from "react-native";

import Button from "../components/Button";
import {View} from "../components/Themed";

type BaseModalProps = {
  closeModal: () => void;
  isVisible?: boolean;
  children?: React.ReactNode;
};

export default function BaseModal({ closeModal, isVisible, children }: BaseModalProps) {
    const closeModalCustom = () => {
        closeModal();
    };
    return (
        <Modal visible={isVisible}>
            <View style={styles.container}>
                <Button
                    title={"Go back"}
                    style={styles.backButton}
                    onPress={closeModalCustom}
                />
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
