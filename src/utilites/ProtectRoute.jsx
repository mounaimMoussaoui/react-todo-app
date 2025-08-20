import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import useSession from "../customsHooks/useSession";

export const ProtectRoute = React.memo(({children}) => {
    const [user] = useSession("user", null);
    const navigate = useNavigate();

    useEffect(() => {
        if(user === null) {
            navigate("/login");
        }
    //eslint-disable-next-line
    }, [user]);

    return children
});