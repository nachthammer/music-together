import React, {createContext, useContext, useReducer} from "react";
import {IMusicRoomsState, InitialMusicRoomsState} from "../states";
import MusicRoomsReducer from "../reducers/MusicRoomsReducer";
import {MusicRoomsAction} from "../actions/MusicRoomsAction";

type Dispatch = (action: MusicRoomsAction) => void;

const MusicRoomsContext = createContext<{ state: IMusicRoomsState; dispatch: Dispatch } | undefined>(undefined);

const MusicRoomsContextProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(MusicRoomsReducer, InitialMusicRoomsState);
    const value = { state, dispatch };
    return (
        <MusicRoomsContext.Provider value={value}>{children}</MusicRoomsContext.Provider>
    );
};

const useMusicRoomsContext = () => {
    const context = useContext(MusicRoomsContext);
    if (context === undefined) {
        throw new Error("useMusicRoomsContext must be used within a MusicRoomsContextProvider");
    }
    return context;
};

export { MusicRoomsContextProvider, useMusicRoomsContext };
