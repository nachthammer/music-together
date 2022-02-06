import {UserAction, UserContextActionTypes} from "../actions/UserAction";
import {IUserState} from "../states";

const UserReducer = (state: IUserState, action: UserAction): IUserState => {
    switch (action.type) {
    case UserContextActionTypes.SET_USERNAME: {
        return {
            username: action.payload
        };
    }

    case UserContextActionTypes.CHANGE_USERNAME: {
        return {
            username: action.payload
        };
    }

    case UserContextActionTypes.REMOVE_USERNAME: {
        return {
            username: ""
        };
    }

    default: {
        return state;
    }
    }
};

export default UserReducer;