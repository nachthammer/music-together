// eslint-disable-next-line no-shadow
import {TrackProps} from "../../interfaces/interfaces";

// eslint-disable-next-line no-shadow
export enum TrackContextActionTypes {
    SETUP_PLAYER = "SETUP_PLAYER",
    PLAY_TRACK_INSTANTLY = "PLAY_TRACK_INSTANTLY",
    ADD_TRACK_TO_QUEUE = "ADD_TRACK_TO_QUEUE",
    CLEAR_TRACK_LIST = "CLEAR_TRACK_LIST"
}

export type TrackAction =
    | { type: TrackContextActionTypes.PLAY_TRACK_INSTANTLY; payload: TrackProps }
    | { type: TrackContextActionTypes.ADD_TRACK_TO_QUEUE; payload: TrackProps }
    | { type: TrackContextActionTypes.CLEAR_TRACK_LIST }
    | { type: TrackContextActionTypes.SETUP_PLAYER }