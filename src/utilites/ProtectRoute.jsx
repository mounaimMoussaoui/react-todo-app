import React, {useEffect} from "react";
import {useTodoContext} from "../contexts/TodoProvider";
import {useNavigate} from "react-router-dom";

export const ProtectRoute = React.memo(({children}) => {
    const {state} = useTodoContext();
    const navigate = useNavigate();
    const user =  state.user;

    useEffect(() => {
        if (user === null) {
            navigate("/login", {replace: true});
        }
    }, [user, navigate]);

    return children
})