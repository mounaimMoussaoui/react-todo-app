import React, {createContext, useContext, useReducer} from "react";
import UserReducer from "../reducers/UserReducer";


export const AuthenticationContext = createContext();

export default function AuthenticationProvider({children}) {

    const initialState = {
        listUsers: [],
    }

    const [state, dispatch] = useReducer(UserReducer, initialState);

    return (
        <AuthenticationContext.Provider value={{state, dispatch}}>
            {children}
        </AuthenticationContext.Provider>
    )
}

export const useAuthenticationContext = () => useContext(AuthenticationContext);