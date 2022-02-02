import {useState} from "react";
import {Pressable, StyleSheet, TextInput} from "react-native";
import Button from "../components/Button";
import {Text, View} from "../components/Themed";
import {useNavigation} from "@react-navigation/native";
import {storeUsername} from "../stores/UserStore";

import axios from "axios";

type LoginScreenProps = {
    login: (username: string) => void;
};

export default function LoginScreen({login}: LoginScreenProps) {
    const navigation = useNavigation();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loginFailed, setLoginFailed] = useState<boolean>(false);

    const [loginFailedString, setLoginFailedString] = useState<string>("");

    const validateLogin = () => {
        const requestData = {
            username: username,
            password: password
        };
        axios
            .post("/api/login", requestData)
            .then((response) => {
                if (response.data === "correct user") {
                    login(username);
                    setLoginFailed(false);
                    navigation.navigate("Home");
                    storeUsername(username);
                    return;
                }
            })
            .catch((err) => {
                setLoginFailed(true);
                setLoginFailedString(err.response.data);
            });
    };

    const goToRegisterScreen = () => {
        navigation.navigate("Register");
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputBox}>
                <Text style={styles.info}>Username: </Text>
                <TextInput
                    style={styles.inputElement}
                    onChangeText={setUsername}
                    value={username}
                    placeholder="username"
                    autoCompleteType="username"
                />
            </View>
            <View style={styles.inputBox}>
                <Text style={styles.info}>Password: </Text>
                <TextInput
                    style={styles.inputElement}
                    onChangeText={setPassword}
                    value={password}
                    placeholder="password"
                    secureTextEntry={true}
                />
            </View>

            <View>
                <Pressable onPress={goToRegisterScreen}>
                    <Text>You have no account yet? Register here.</Text>
                </Pressable>
            </View>

            <View style={styles.loginButton}>
                <Button
                    title="Login"
                    onPress={validateLogin}
                    style={{width: "100%"}}
                />
            </View>
            {loginFailed && 
                <View style={styles.failedMessage}>
                    <Text style={styles.failedMessageText}>{loginFailedString}</Text>
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        backgroundColor: "white"
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 30
    },
    inputElement: {
        width: "100%",
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 10,
        padding: 5,
        paddingLeft: 12
    },
    info: {
        marginBottom: 10
    },
    inputBox: {
        justifyContent: "flex-start",
        marginBottom: 20
    },
    loginButton: {
        marginTop: 10
    },
    failedMessage: {
        marginTop: 20
    },
    failedMessageText: {
        color: "red"
    }
});
