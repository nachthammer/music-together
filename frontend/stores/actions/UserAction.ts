// eslint-disable-next-line no-shadow
export enum UserContextActionTypes {
    SET_USERNAME = "set username",
    CHANGE_USERNAME = "change username",
    REMOVE_USERNAME = "remove username"
}

export type UserAction =
    | { type: UserContextActionTypes.SET_USERNAME; payload: string }
    | { type: UserContextActionTypes.CHANGE_USERNAME; payload: string }
    | { type: UserContextActionTypes.REMOVE_USERNAME }