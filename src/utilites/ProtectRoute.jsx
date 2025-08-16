import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import useSession from "../customsHooks/useSession";

export const ProtectRoute = React.memo(({children}) => {
    const [user] = useSession("user", null);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(user);
        if(user === null) {
            navigate("/login");
        }

    }, [user]);

    return children
});