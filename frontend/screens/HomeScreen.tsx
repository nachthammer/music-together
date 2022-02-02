import React, {useEffect, useState} from "react";
import {ScrollView, StyleSheet, TouchableOpacity} from "react-native";

import {Text, View} from "../components/Themed";
import Button from "../components/Button";
import {useNavigation} from "@react-navigation/native";
import MusicRoomBox, {MusicRoomBoxProps} from "../components/MusicRoomBox";
import {retrieveMusicRoomsFromServer} from "../util";
import CreateMusicRoomModal from "../modals/CreateMusicRoomModal";
import JoinMusicRoomModal from "../modals/JoinMusicRoomModal";
import MusicRoomSettingsModal from "../modals/MusicRoomSettingsModal";
import {readUsername} from "../stores/UserStore";

type HomeScreenProps = {
    title: string;
    currentMusicRoomProps:  MusicRoomBoxProps;
    setMusicRoomProps: React.Dispatch<React.SetStateAction<MusicRoomBoxProps>>;
};

export default function HomeScreen({
    currentMusicRoomProps,
    setMusicRoomProps
}: HomeScreenProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [username, setUsername] = useState("");
    const [musicRooms, setMusicRooms] = useState<MusicRoomBoxProps[]>([]);
    const navigation = useNavigation();

    const [createRoomModalVisible, setCreateRoomModalVisible] =
        useState<boolean>(false);
    const [joinRoomModalVisible, setJoinRoomModalVisible] =
        useState<boolean>(false);
    const [musicRoomSettingsModalVisible, setMusicRoomSettingsModalVisible] = useState<boolean>(false);

    useEffect(() => {
        readUsername().then((value) => {
            setUsername(value);
        });
    }, []);

    useEffect(() => {
        retrieveMusicRoomsFromServer(username).then((retrievedMusicRooms) => {
            setMusicRooms(retrievedMusicRooms);
            setIsLoading(false);
        });
    }, [createRoomModalVisible, joinRoomModalVisible, musicRoomSettingsModalVisible, username]);

    const addMusicRoom = (musicRoom: MusicRoomBoxProps) => {
        setMusicRooms(musicRooms.concat(musicRoom));
    };

    const openMusicRoomSettings = () => {
        setMusicRoomSettingsModalVisible(true);
    };

    const removeMusicRoom = () => {
        let newMusicRooms = musicRooms.filter(function(props, index, arr){
            return props.uuid !== currentMusicRoomProps.uuid;
        });
        setMusicRooms(newMusicRooms);
    };

    const joinMusicRoom = (musicRoom: MusicRoomBoxProps) => {
        setMusicRooms(musicRooms.concat(musicRoom));
    };

    const navigateToMusicRoom = () => {
        navigation.navigate("MusicRoom");
    };

    return (
        !isLoading && <>
            {<CreateMusicRoomModal
                visible={createRoomModalVisible}
                addMusicRoom={addMusicRoom}
                closeModal={() => setCreateRoomModalVisible(false)}
            />}
            <JoinMusicRoomModal
                visible={joinRoomModalVisible}
                joinMusicRoom={joinMusicRoom}
                closeModal={() => setJoinRoomModalVisible(false)}
            />
            <View style={styles.container}>
                <View style={styles.roomButtons}>
                    <Button title={"Create a new music room"} onPress={() => setCreateRoomModalVisible(true)} style={{width: "45%"}}/>
                    <Button title={"Join a new music room"} onPress={() => setJoinRoomModalVisible(true)} style={{width: "45%"}}/>
                </View>
                <Text style={styles.title}>Your music rooms: {username}</Text>
                <ScrollView style={styles.scrollView}>
                    {musicRooms.map((props, index) => 
                        <MusicRoomBox {...props} onClick={navigateToMusicRoom} onLongClick={openMusicRoomSettings} key={index}/>
                    )}
                </ScrollView>
                <MusicRoomSettingsModal visible={musicRoomSettingsModalVisible} removeMusicRoom={removeMusicRoom} closeModal={() => setMusicRoomSettingsModalVisible(false)}></MusicRoomSettingsModal>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 30
    },
    roomButtons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around"
    },
    musicNameText: {
        fontSize: 15,
        justifyContent: "center",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "auto",
        marginBottom: "auto"
    },
    button: {
        borderRadius: 5,
        flexDirection: "row",
        height: 50,
        backgroundColor: "#ff99ff",
        alignItems: "center",
        justifyContent: "center",
        elevation: 0,
        width: "45%"
    },
    buttonText: {
        padding: 5,
        justifyContent: "space-evenly"
    },
    scrollView: {
        marginTop: 5
    },
    joinRoomButton: {
        width: "40%"
    },
    title: {
        padding: 10,
        fontSize: 20,
        fontWeight: "bold"
    },
    musicRoomBox: {
        marginBottom: 20,
        borderWidth: 1,
        height: 40,
        borderRadius: 5
    }
});
