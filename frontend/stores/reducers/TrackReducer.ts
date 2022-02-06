import {ITrackState} from "../states";
import {TrackAction, TrackContextActionTypes} from "../actions/TrackAction";
import TrackPlayer from "react-native-track-player";

// TODO handle the promises
const TrackReducer = (state: ITrackState, action: TrackAction): ITrackState => {
    switch (action.type) {
    case TrackContextActionTypes.SETUP_PLAYER: {
        //TrackPlayer.setupPlayer({});
        return state;
    }
    case TrackContextActionTypes.PLAY_TRACK_INSTANTLY: {
        //TrackPlayer.add(action.payload);
        return state;
    }

    case TrackContextActionTypes.ADD_TRACK_TO_QUEUE: {
        //TrackPlayer.add(action.payload);
        return state;
    }

    case TrackContextActionTypes.CLEAR_TRACK_LIST: {
        //TrackPlayer.remove([0]);
        return state;
    }

    default: {
        return state;
    }
    }
};

export default TrackReducer;