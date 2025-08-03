import React from "react";
import {useTodoContext} from "../contexts/TodoProvider";
import {Login} from "../authentification/Login";

export const ProtectRoute = React.memo(({children}) => {
    const {state} = useTodoContext();
    const user =  state.user;

    return (
        user ? children : <Login />
    )
})