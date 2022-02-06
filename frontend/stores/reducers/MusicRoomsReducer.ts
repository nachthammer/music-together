import {IMusicRoomsState} from "../states";
import {MusicRoomsAction, MusicRoomsContextActionTypes} from "../actions/MusicRoomsAction";
import {DefaultMusicRooms} from "../../constants/Defaults";

const MusicRoomsReducer = (state: IMusicRoomsState, action: MusicRoomsAction): IMusicRoomsState => {
    switch (action.type) {
    case MusicRoomsContextActionTypes.INIT_MUSIC_ROOMS: {
        return {
            currentMusicRoom: DefaultMusicRooms,
            musicRooms: []
        };
    }
    case MusicRoomsContextActionTypes.ADD_MUSIC_ROOM: {
        return {
            currentMusicRoom: state.currentMusicRoom,
            musicRooms: state.musicRooms.concat(action.payload)
        };
    }
    case MusicRoomsContextActionTypes.REMOVE_MUSIC_ROOM: {
        const newMusicRooms = state.musicRooms.filter(function (props, index, arr) {
            return props.uuid !== action.payload.uuid;
        });
        return {
            currentMusicRoom: state.currentMusicRoom,
            musicRooms: newMusicRooms
        };
    }
    case MusicRoomsContextActionTypes.SET_CURRENT_MUSIC_ROOM: {
        return {
            currentMusicRoom: action.payload,
            musicRooms: state.musicRooms
        };
    }
    case MusicRoomsContextActionTypes.SET_MUSIC_ROOMS: {
        return {
            currentMusicRoom: state.currentMusicRoom,
            musicRooms: action.payload
        };
    }

    default: {
        return state;
    }
    }
};

export default MusicRoomsReducer;