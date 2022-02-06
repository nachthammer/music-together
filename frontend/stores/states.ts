import MusicRoomsReducer from "./reducers/MusicRoomsReducer";
import {MusicRoomBoxProps} from "../components/MusicRoomBox";

export interface IUserState {
    username: string
}

export interface ITrackState {
    playing: boolean
}

export interface IMusicRoomsState {
    currentMusicRoom: MusicRoomBoxProps;
    musicRooms: MusicRoomBoxProps[];
}

export const InitialUserState: IUserState = {
    username: ""
};

export const InitialTrackState: ITrackState = {
    playing: false
};

export const InitialMusicRoomsState: IMusicRoomsState = {
    currentMusicRoom: {
        username: "",
        name: "",
        uuid: ""
    },
    musicRooms: []
};