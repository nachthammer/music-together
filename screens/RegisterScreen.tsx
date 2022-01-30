import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Platform, StyleSheet, TextInput } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";

import { Pressable } from "react-native";

import { Text, View, Button } from "../components/Themed";
import { NavigationHelpersContext } from "@react-navigation/native";

export interface IRegisterProps {
  navigation: any;
  login: () => void;
}

export default function RegisterScreen({ navigation, login }: IRegisterProps) {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [registerFailed, setRegisterFailed] = useState<boolean>(false);

  const validateRegister = () => {
    setRegisterFailed(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputBox}>
        <Text style={styles.info}>Email: </Text>
        <TextInput
          style={styles.inputElement}
          onChangeText={setEmail}
          value={email}
          placeholder="email@email.com"
          autoCompleteType="email"
        ></TextInput>
      </View>

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
        <Pressable onPress={navigation.navigate("Login")}>
          <Text>You already have an account? Login here.</Text>
        </Pressable>
      </View>

      <View style={styles.loginButton}>
        <Button title="Press me" onPress={validateRegister} />
      </View>
      {registerFailed && (
        <View style={styles.failedMessage}>
          <Text style={styles.failedMessageText}>
            Wrong username or password.
          </Text>
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
