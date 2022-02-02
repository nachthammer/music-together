import {useState} from "react";
import {Pressable, StyleSheet, TextInput} from "react-native";
import Button from "../components/Button";
import {Text, View} from "../components/Themed";
import {useNavigation} from "@react-navigation/native";
import axios from "axios";

export type RegisterScreenProps = {
    login: (username: string) => void;
};

export default function RegisterScreen({login}: RegisterScreenProps) {
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password1, setPassword1] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");

    const [registerFailed, setRegisterFailed] = useState<boolean>(false);
    const [registerFailedString, setRegisterFailedString] = useState<string>("");

    const navigation = useNavigation();

    const validateRegister = () => {
        /*more validators, for example if email is already used or username is taken*/
        if (password1 !== password2) {
            setRegisterFailed(true);
            setRegisterFailedString("Passwords do not match.");
            return;
        }
        const requestData = {
            email: email,
            username: username,
            password: password1
        };

        axios
            .post("/api/register", requestData)
            .then((response) => {
                if (response.data === "registration completed") {
                    login(username);
                    setRegisterFailed(false);
                    navigation.navigate("Home");
                    return;
                }
            })
            .catch((err) => {
                setRegisterFailed(true);
                setRegisterFailedString(err.response.data);
            });
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputBox}>
                <Text style={styles.info}>Email: </Text>
                <TextInput
                    style={styles.inputElement}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="email@email.com"
                    autoCompleteType="email"
                />
            </View>

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
                    onChangeText={setPassword1}
                    value={password1}
                    placeholder="password"
                    secureTextEntry={true}
                />
            </View>

            <View style={styles.inputBox}>
                <Text style={styles.info}>Password: </Text>
                <TextInput
                    style={styles.inputElement}
                    onChangeText={setPassword2}
                    value={password2}
                    placeholder="password"
                    secureTextEntry={true}
                />
            </View>

            <View>
                <Pressable onPress={() => navigation.navigate("Login")}>
                    <Text>{"You already have an account? Login here."}</Text>
                </Pressable>
            </View>

            <View style={styles.loginButton}>
                <Button
                    title="Register"
                    onPress={validateRegister}
                    style={{width: "100%", marginBottom: 15}}
                />
            </View>
            {registerFailed &&
            <View style={styles.failedMessage}>
                <Text style={styles.failedMessageText}>{registerFailedString}</Text>
            </View>
            }
        </View>
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
        marginBottom: 10
    },
    loginButton: {
        marginTop: 10
    },
    failedMessage: {
        marginBottom: 10
    },
    failedMessageText: {
        color: "red"
    }
});
