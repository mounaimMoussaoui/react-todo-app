import {useTodoContext} from "../contexts/TodoProvider";
import styles from "../style/ModularStyle.module.scss";
import {SET_PAGINATION} from "../constants/actionTypes";
import React, {useCallback} from "react";
import {motion} from "framer-motion";
import { MdNavigateBefore, MdNavigateNext  } from "react-icons/md";

export const PaginationForm = React.memo(() => {

    const {state, dispatch} = useTodoContext();
    const pageSize = state.nbElements;
    const totalPages = Math.max(1, Math.ceil(state.globalTodos.length / pageSize));
    const currentPage = Math.floor(state.pagination / pageSize) + 1;

    const handlePagination = useCallback((e) => {
        if(e.currentTarget.dataset.action === "moveUp" && totalPages > currentPage ) {
            dispatch({type: SET_PAGINATION, payload: pageSize});
        } else if(e.currentTarget.dataset.action === "moveDown" && 0 < state.pagination) {
            dispatch({type: SET_PAGINATION, payload: -pageSize});
        }
    }, [dispatch, pageSize, state.pagination, currentPage, totalPages]);

    return <motion.div transition={{ type: "spring" }}
                       intail={{opacity: 0}}
                       animate={{opacity: 1}}
                       className={styles['paginationBox']}>

                <motion.button initial={{scale: 0.9}}
                               whileHover={{ scale: 1 }}
                               animate={{transition: {duration: 0.3}}}
                               className={styles['paginationBtn']}
                               id={'btnMoveDown'}
                               onClick={handlePagination}
                               data-action={"moveDown"}><MdNavigateBefore aria-hidden="true"  /><span>Previous</span></motion.button>

                <motion.span whileHover={{ opacity: 0.8 }}
                             className={styles['resultShower']}>{` ${totalPages} / ${currentPage}`}</motion.span>

                <motion.button initial={{scale: 0.9}}
                               whileHover={{ scale: 1 }}
                               animate={{transition: {duration: 0.3}}}
                               className={styles['paginationBtn']}
                               id={'btnMoveUp'}
                               onClick={handlePagination}
                               data-action={"moveUp"}><span>Next</span><MdNavigateNext aria-hidden="true"  /></motion.button>
           </motion.div>
});