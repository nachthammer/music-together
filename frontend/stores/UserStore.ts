import AsyncStorage from "@react-native-async-storage/async-storage";


async function setUsername(username: string) {
    try {
        await AsyncStorage.setItem("@username", username);
    } catch (e) {
        console.error("Could not store username");
    }
}

function getUsername() {
    try {
        const value = AsyncStorage.getItem("@username");
        value.then((username) => {
            return username;
        });
    } catch (e) {
        console.log("Could not read username from storage");
        return "";
    }
}



