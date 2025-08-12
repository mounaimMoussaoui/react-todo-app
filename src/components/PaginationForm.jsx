import {useTodoContext} from "../contexts/TodoProvider";
import styles from "../style/ModularStyle.module.scss";
import {SET_PAGINATION} from "../constants/actionTypes";
import React, {useCallback} from "react";
import {motion} from "framer-motion";

export const PaginationForm = React.memo(() => {

    const {state, dispatch} = useTodoContext();

    const handlePagination = useCallback((e) => {
        if(e.currentTarget.dataset.action === "moveUp" && Math.ceil( state.globalTodos.length / 5 ) > Math.ceil(state.pagination / 5 ) + 1 ) {
            dispatch({type: SET_PAGINATION, payload: state.nbElements});
        } else if(e.currentTarget.dataset.action === "moveDown" && 0 < state.pagination) {
            dispatch({type: SET_PAGINATION, payload: -state.nbElements});
        }
    }, [dispatch, state.nbElements, state.pagination, state.globalTodos]);

    return <motion.div intail={{opacity: 0}} animate={{opacity: 1, transition: {duration: 0.5}}} className={styles['paginationBox']}>
                <motion.button initial={{scale: 0.9}} whileHover={{ scale: 1 }} animate={{transition: {duration: 0.3}}} className={styles['paginationBtn']} id={'btnMoveDown'} onClick={handlePagination} data-action={"moveDown"}>Move Down</motion.button>
                <motion.span whileHover={{ opacity: 0.8 }} className={styles['resultShower']}>{` ${Math.ceil(state.globalTodos.length / 5)} / ${Math.ceil(state.pagination / 5) + 1}`}</motion.span>
                <motion.button initial={{scale: 0.9}} whileHover={{ scale: 1 }} animate={{transition: {duration: 0.3}}} className={styles['paginationBtn']} id={'btnMoveUp'} onClick={handlePagination} data-action={"moveUp"}>Move UP</motion.button>
           </motion.div>
})