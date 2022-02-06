import AsyncStorage from "@react-native-async-storage/async-storage";

export async function storeUsername(username: string) {
    try {
        await AsyncStorage.setItem("@username", username);
    } catch (e) {
    // eslint-disable-next-line no-console
        console.error("Could not store username");
    }
}

export async function readUsername(): Promise<string> {
    try {
        const value = await AsyncStorage.getItem("@username");
        return value ?? "";
    } catch (e) {
    // eslint-disable-next-line no-console
        console.log("Could not read username from storage");
        return "";
    }
}

export async function removeUsername(): Promise<void> {
    await AsyncStorage.removeItem("@username");
}
