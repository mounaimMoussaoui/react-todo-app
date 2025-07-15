import {useTodoContext} from "../contexts/TodoProvider";

import styles from "../style/ModularStyle.module.scss";
export default function PaginationForm() {

    const {state, dispatch} = useTodoContext();

    function handlePagination(e) {
        if(e.target.dataset.action === "moveUp" && Math.ceil(state.todos.length / 5) > (Math.ceil(state.pagination / 5) + 1)) {
            dispatch({type: 'SET-PAGINATION', payload: state.nbElements});
        } else if(e.target.dataset.action === "moveDown" && 0 < state.pagination) {
            dispatch({type: 'SET-PAGINATION', payload: -state.nbElements});
        }
    }

    return <div className={styles['paginationBox']}>
                <button className={styles['paginationBtn']} onClick={handlePagination} data-action={"moveDown"}>Move Down</button>
                <span className={styles['resultShower']}>{` ${Math.ceil(state.todos.length / 5)} / ${Math.ceil(state.pagination / 5) + 1}`}</span>
                <button className={styles['paginationBtn']} onClick={handlePagination} data-action={"moveUp"}>Move UP</button>
           </div>
}