import {StyleSheet} from "react-native";
import React from "react";
import Button from "./Button";
import {useNavigation} from "@react-navigation/native";
import {removeUsername} from "../storage/UserStore";
import {useUserContext} from "../stores/contexts/UserContext";
import {UserContextActionTypes} from "../stores/actions/UserAction";

export type LogoutButtonProps = {
    isLoggedOut?: boolean;
};

export default function LogoutButton({isLoggedOut}: LogoutButtonProps) {
    const {state, dispatch} = useUserContext();
    const navigation = useNavigation();
    //const loggedIn: boolean = username !== "";

    const logout = () => {
        // eslint-disable-next-line no-console
        removeUsername()
            .then(() => {
                dispatch({type: UserContextActionTypes.REMOVE_USERNAME});
                navigation.navigate("Login");
            })
            .catch((err) => {
                // eslint-disable-next-line no-console
                console.error(
                    `Could not remove username from store duo to following error: ${err}`
                );
                navigation.navigate("Login");
            });
    };

    return (
        <>
            {!isLoggedOut &&
            <Button
                title={"Logout"}
                onPress={logout}
                style={{backgroundColor: "white", fontSize: 24}}
            />
            }
        </>
    );
}

const styles = StyleSheet.create({
    songBox: {
        marginBottom: 20,
        borderWidth: 1,
        height: 40,
        borderRadius: 5,
        width: 270
    },
    songNameText: {
        fontSize: 15,
        justifyContent: "center",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "auto",
        marginBottom: "auto"
    }
});
