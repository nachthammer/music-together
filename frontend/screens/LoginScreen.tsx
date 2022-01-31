import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Platform, StyleSheet, TextInput } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";

import { Pressable } from "react-native";
import Button from "../components/Button";
import { Text, View } from "../components/Themed";
import {
  NavigationHelpersContext,
  useNavigation,
} from "@react-navigation/native";

import axios from "axios";
import { convertError } from "../util";

type LoginScreenProps = {
  login: (username: string) => void;
};

export default function LoginScreen({ login }: LoginScreenProps) {
  const navigation = useNavigation();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginFailed, setLoginFailed] = useState<boolean>(false);

  const [loginFailedString, setLoginFailedString] = useState<string>("");

  const validateLogin = () => {
    console.log(login);
    const requestData = {
      username: username,
      password: password,
    };
    console.log("validating login");
    axios
      .post("/api/login", requestData)
      .then((response) => {
        console.log(response.data);
        if (response.data === "correct user") {
          login(username);
          setLoginFailed(false);
          navigation.navigate("Home");
          return;
        }
      })
      .catch((err) => {
        setLoginFailed(true);
        setLoginFailedString(err.response.data);
      });
  };

  const goToRegisterScreen = () => {
    console.log("goto register screen.");
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputBox}>
        <Text style={styles.info}>Username: </Text>
        <TextInput
          style={styles.inputElement}
          onChangeText={setUsername}
          value={username}
          placeholder="username"
          autoCompleteType="username"
        ></TextInput>
      </View>
      <View style={styles.inputBox}>
        <Text style={styles.info}>Password: </Text>
        <TextInput
          style={styles.inputElement}
          onChangeText={setPassword}
          value={password}
          placeholder="password"
          secureTextEntry={true}
        ></TextInput>
      </View>

      <View>
        <Pressable onPress={goToRegisterScreen}>
          <Text>You have no account yet? Register here.</Text>
        </Pressable>
      </View>

      <View style={styles.loginButton}>
        <Button title="Login" onPress={validateLogin} style={""} />
      </View>
      {loginFailed && (
        <View style={styles.failedMessage}>
          <Text style={styles.failedMessageText}>{loginFailedString}</Text>
        </View>
      )}
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 30,
  },
  inputElement: {
    width: "100%",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    paddingLeft: 12,
  },
  info: {
    marginBottom: 10,
  },
  inputBox: {
    justifyContent: "flex-start",
    marginBottom: 20,
  },
  loginButton: {
    marginTop: 10,
  },
  failedMessage: {
    marginTop: 20,
  },
  failedMessageText: {
    color: "red",
  },
});