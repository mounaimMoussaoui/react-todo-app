import React, {useCallback, useEffect} from "react";
import { TiTimesOutline } from "react-icons/ti";
import { IoMdNotificationsOutline } from "react-icons/io";
import {motion} from "framer-motion";
import styles from "../style/ModularStyle.module.scss";
import {useTodoContext} from "../contexts/TodoProvider";
import {PUT_NOTIFICATION} from "../constants/actionTypes";

export const NotificationBox = React.memo(() => {
    const {state, dispatch} = useTodoContext();
    const handleClick = useCallback(() => {
        dispatch({type: PUT_NOTIFICATION, payload: null});
    }, [dispatch]);

    useEffect(() => {
        const id = setTimeout(() => {
            dispatch({type: PUT_NOTIFICATION, payload: null});
        }, 3000);

        return () => clearTimeout(id);
    }, [dispatch]);

    return  (
        <motion.div transition={{ type: "spring"}} initial={{opacity: 0, y: -100}} animate={{opacity: 1, y: 10}} className={styles.notificationBox} >
            <IoMdNotificationsOutline />
            <span>{state.notification}</span>
            <TiTimesOutline onClick={handleClick} />
        </motion.div>

    )

})