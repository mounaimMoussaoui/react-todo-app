import {useTodoContext} from "../contexts/TodoProvider";
import styles from "../style/ModularStyle.module.scss";
import {REMOVE_TODO, SET_MESSAGE_VALUE} from "../constants/actionTypes";
import React, {useCallback} from "react";
import {motion} from "framer-motion";

export default function AlertBox() {

    const {state, dispatch} = useTodoContext();

    const handleConfirmation = useCallback((action) => {
        if(action === "yes") {
            dispatch({ type: REMOVE_TODO, payload: state.idDel });
            dispatch( {type: SET_MESSAGE_VALUE, payload: ""} )
        } else if( action === "no") {
            dispatch( {type: SET_MESSAGE_VALUE, payload: ""} )
        }
    }, [dispatch, state.idDel]);

    return (
        <motion.div drag={'x'} intail={{opacity: 0}} animate={{opacity: 1, transition: {duration: 0.5}}} className={styles['alertBox']}>

            <h4 className={styles['titleAlert']}>Title: Warning</h4>

            <span className={styles['alertMessage']}>{state.message}</span>

            <button className={`${styles['alertBtn']} ${styles['annulation']}`}
                    onClick={() => handleConfirmation("no")}>No
            </button>

            <button className={`${styles['alertBtn']} ${styles['confirmation']}`}
                    onClick={() => handleConfirmation("yes")}>Yes
            </button>
        </motion.div>
    )
}