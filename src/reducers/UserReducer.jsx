import {ADD_USER} from "../constants/actionTypes";

export default function UserReducer(state, action) {
    switch (action.type) {
        case ADD_USER: return {
            ...state,
            listUsers: [...state.listUsers, action.payload],
        }
        default: return state;
    }
}