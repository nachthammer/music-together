// eslint-disable-next-line no-shadow
import {MusicRoomBoxProps} from "../../components/MusicRoomBox";

// eslint-disable-next-line no-shadow
export enum MusicRoomsContextActionTypes {
    INIT_MUSIC_ROOMS = "INIT_MUSIC_ROOMS", // inits music rooms or clears them if some already exist
    ADD_MUSIC_ROOM = "ADD_MUSIC_ROOM",
    REMOVE_MUSIC_ROOM = "REMOVE_MUSIC_ROOM",
    SET_CURRENT_MUSIC_ROOM = "SET_CURRENT_MUSIC_ROOM",
    SET_MUSIC_ROOMS = "SET_MUSIC_ROOMS"
}

export type MusicRoomsAction =
    | { type: MusicRoomsContextActionTypes.INIT_MUSIC_ROOMS }
    | { type: MusicRoomsContextActionTypes.ADD_MUSIC_ROOM; payload: MusicRoomBoxProps }
    | { type: MusicRoomsContextActionTypes.REMOVE_MUSIC_ROOM; payload: MusicRoomBoxProps }
    | { type: MusicRoomsContextActionTypes.SET_CURRENT_MUSIC_ROOM; payload: MusicRoomBoxProps }
    | { type: MusicRoomsContextActionTypes.SET_MUSIC_ROOMS; payload: MusicRoomBoxProps[] }