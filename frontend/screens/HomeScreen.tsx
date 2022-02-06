import React, {useEffect, useState} from "react";
import {ScrollView, StyleSheet} from "react-native";

import {Text, View} from "../components/Themed";
import Button from "../components/Button";
import {useNavigation} from "@react-navigation/native";
import MusicRoomBox, {MusicRoomBoxProps} from "../components/MusicRoomBox";
import {retrieveMusicRoomsFromServer} from "../util";
import CreateMusicRoomModal from "../modals/CreateMusicRoomModal";
import JoinMusicRoomModal from "../modals/JoinMusicRoomModal";
import MusicRoomSettingsModal from "../modals/MusicRoomSettingsModal";
import {readUsername} from "../storage/UserStore";
import {useUserContext} from "../stores/contexts/UserContext";
import {useMusicRoomsContext} from "../stores/contexts/MusicRoomsContext";
import {UserContextActionTypes} from "../stores/actions/UserAction";
import {MusicRoomsContextActionTypes} from "../stores/actions/MusicRoomsAction";

type HomeScreenProps = {};

export default function HomeScreen() {
    // all contexts
    const [username, dispatchUsername] = [useUserContext().state.username, useUserContext().dispatch];
    const [musicRooms, dispatchMusicRooms] = [useMusicRoomsContext().state.musicRooms, useMusicRoomsContext().dispatch];
    const [currentMusicRoom] = [useMusicRoomsContext().state.currentMusicRoom];
    const [isLoading, setIsLoading] = useState(true);

    const navigation = useNavigation();

    const [createRoomModalVisible, setCreateRoomModalVisible] =
        useState<boolean>(false);
    const [joinRoomModalVisible, setJoinRoomModalVisible] =
        useState<boolean>(false);
    const [musicRoomSettingsModalVisible, setMusicRoomSettingsModalVisible] =
        useState<boolean>(false);

    useEffect(() => {
        readUsername().then((value: string) => {
            dispatchUsername({type: UserContextActionTypes.SET_USERNAME, payload: value});
        });
    }, []);

    useEffect(() => {
        retrieveMusicRoomsFromServer(username).then((retrievedMusicRooms) => {
            dispatchMusicRooms({type: MusicRoomsContextActionTypes.SET_MUSIC_ROOMS, payload: retrievedMusicRooms});
            setIsLoading(false);
        });
    }, [
        createRoomModalVisible,
        joinRoomModalVisible,
        musicRoomSettingsModalVisible,
        username
    ]);

    const addMusicRoom = (musicRoom: MusicRoomBoxProps) => {
        dispatchMusicRooms({type: MusicRoomsContextActionTypes.ADD_MUSIC_ROOM, payload: musicRoom});
    };

    const removeMusicRoom = () => {
        dispatchMusicRooms({type: MusicRoomsContextActionTypes.REMOVE_MUSIC_ROOM, payload: currentMusicRoom});
    };

    const joinMusicRoom = (musicRoom: MusicRoomBoxProps) => {
        dispatchMusicRooms({type: MusicRoomsContextActionTypes.ADD_MUSIC_ROOM, payload: musicRoom});
    };

    const navigateToMusicRoom = () => {
        navigation.navigate("MusicRoom");
    };

    const openMusicRoomSettings = () => {
        setMusicRoomSettingsModalVisible(true);
    };

    return (
        <>
            {!isLoading &&
            <>
                {
                    <CreateMusicRoomModal
                        visible={createRoomModalVisible}
                        addMusicRoom={addMusicRoom}
                        closeModal={() => setCreateRoomModalVisible(false)}
                    />
                }
                <JoinMusicRoomModal
                    visible={joinRoomModalVisible}
                    joinMusicRoom={joinMusicRoom}
                    closeModal={() => setJoinRoomModalVisible(false)}
                />
                <View style={styles.container}>
                    <View style={styles.roomButtons}>
                        <Button
                            title={"Create a new music room"}
                            onPress={() => setCreateRoomModalVisible(true)}
                            style={{width: "45%"}}
                        />
                        <Button
                            title={"Join a new music room"}
                            onPress={() => setJoinRoomModalVisible(true)}
                            style={{width: "45%"}}
                        />
                    </View>
                    <Text style={styles.title}>Your music rooms</Text>
                    <ScrollView style={styles.scrollView}>
                        {musicRooms.map((props, index) =>
                            <MusicRoomBox
                                {...props}
                                onClick={navigateToMusicRoom}
                                onLongClick={openMusicRoomSettings}
                                key={index}
                            />
                        )}
                    </ScrollView>
                    <MusicRoomSettingsModal
                        visible={musicRoomSettingsModalVisible}
                        removeMusicRoom={removeMusicRoom}
                        closeModal={() => setMusicRoomSettingsModalVisible(false)}
                    />
                </View>
            </>
            }
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
        justifyContent: "space-evenly",
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
