import React, {createContext, useContext, useEffect, useReducer} from "react";
import {InitialTrackState, ITrackState} from "../states";
import {TrackAction, TrackContextActionTypes} from "../actions/TrackAction";
//import TrackPlayer from "react-native-track-player";
import TrackReducer from "../reducers/TrackReducer";

type Dispatch = (action: TrackAction) => void;

//TrackPlayer.setupPlayer({});
const TrackContext = createContext<{ state: ITrackState; dispatch: Dispatch } | undefined>(undefined);

const TrackContextProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(TrackReducer, InitialTrackState);
    useEffect(() => {
        dispatch({type: TrackContextActionTypes.SETUP_PLAYER});
    }, []);
    const value = { state, dispatch };
    return (
        <TrackContext.Provider value={value}>{children}</TrackContext.Provider>
    );
};

const useTrackContext = () => {
    const context = useContext(TrackContext);
    if (context === undefined) {
        throw new Error("useTrackContext must be used within a TrackContextProvider");
    }
    return context;
};

export { TrackContextProvider, useTrackContext };
