import {useTodoContext} from "../contexts/TodoProvider";
import styles from "../style/ModularStyle.module.scss";
import {SET_PAGINATION} from "../constants/actionTypes";
import {useCallback} from "react";

export default function PaginationForm() {

    const {state, dispatch} = useTodoContext();

    const handlePagination = useCallback((e) => {
        if(e.currentTarget.dataset.action === "moveUp" && Math.ceil( state.globalTodos.length / 5 ) > Math.ceil(state.pagination / 5 ) + 1 ) {
            dispatch({type: SET_PAGINATION, payload: state.nbElements});
        } else if(e.currentTarget.dataset.action === "moveDown" && 0 < state.pagination) {
            dispatch({type: SET_PAGINATION, payload: -state.nbElements});
        }
    }, [dispatch, state.nbElements, state.pagination, state.globalTodos]);

    return <div className={styles['paginationBox']}>
                <button className={styles['paginationBtn']} id={'btnMoveDown'} onClick={handlePagination} data-action={"moveDown"}>Move Down</button>
                <span className={styles['resultShower']}>{` ${Math.ceil(state.globalTodos.length / 5)} / ${Math.ceil(state.pagination / 5) + 1}`}</span>
                <button className={styles['paginationBtn']} id={'btnMoveUp'} onClick={handlePagination} data-action={"moveUp"}>Move UP</button>
           </div>
}