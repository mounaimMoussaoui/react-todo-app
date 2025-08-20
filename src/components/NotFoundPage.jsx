import React, {useCallback, useEffect} from "react";
import {motion} from "framer-motion";
import styles from "../style/ModularStyle.module.scss";
import {useTodoContext} from "../contexts/TodoProvider";
import {NOT_FOUND} from "../constants/actionTypes";
import { CiNoWaitingSign } from "react-icons/ci";
import {useNavigate} from "react-router-dom";

export const NotFoundPage = React.memo(() => {
    const {dispatch} = useTodoContext();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch({type: NOT_FOUND, payload: true});
    }, [dispatch]);

    const handleClick = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    return <motion.div onClick={handleClick} intail={{x: 50}} animate={{x: 0, transition: {duration: 0.5} }} data-testid={"message"} className={styles.containerNotFound}>
            <CiNoWaitingSign className={styles.iconsError} />
            <motion.h1 initial={{opacity: 0}} animate={{ opacity: 1,  transition: {duration: 0.5} }} className={styles.notFound}  data-content={'Page.Not.Found'}>Page.Not.Found</motion.h1>
    </motion.div>

});