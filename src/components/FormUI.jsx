import {useTodoContext} from "../contexts/TodoProvider";
import styles from "../style/ModularStyle.module.scss";
import {
    ADD_TODO,
    CLEAN_TODOS_DONE,
    FILTERED_TODOS, SEARCH_TODOS, SET_TITLE_VALID,
    SET_TITLE_VALUE,
    SET_VALUE_SEARCH,
    SORTED_LIST_TODO
} from "../constants/actionTypes";
import {useRef} from "react";

export default function FormUI() {

    const { state, dispatch } = useTodoContext();
    const filterField = useRef(null);
    const searchField = useRef(null);
    const titleField = useRef(null);

    function resetField() {
        dispatch({type: SET_TITLE_VALUE, payload: ''});
        state.filter = "all";
    }

    function handleSubmit(e) {
        e.preventDefault();
        try {
            if (state.titleValid) {
                const maxId = state.todos.length ? Math.max(...state.todos.map((todo) => todo.id)) : 0;
                const task = {
                    id: maxId + 1,
                    title: state.title,
                    done: false
                }
                dispatch({type: ADD_TODO, payload:task});
                resetField();
            }
        } catch (error) {
            console.error(error)
        }
    }

    function handelSort(e) {
        e.preventDefault();
        dispatch({type: SORTED_LIST_TODO});
        resetField();
    }

    function handleCleanCompleted(e) {
        e.preventDefault();
        dispatch({type: CLEAN_TODOS_DONE});
    }

    function handleFiltered(e) {
        dispatch({ type: FILTERED_TODOS, payload: filterField.current.value });
    }

    function handleSearch(e) {
        dispatch({type: SET_VALUE_SEARCH, payload: searchField.current.value});
        dispatch({type: SEARCH_TODOS, payload: searchField.current.value.toLowerCase()});
    }

    function handleChangeTitle(e) {
        dispatch({type: SET_TITLE_VALUE, payload: titleField.current.value});
        if((/\w.{10,}/gi).test(titleField.current.value)) {
            dispatch( {type: SET_TITLE_VALID, payload: true} );
        } else if(titleField.current.value !== "") {
            dispatch( {type: SET_TITLE_VALID, payload: false} );
        }
    }

    return (<form onSubmit={handleSubmit} className={styles['styleForm']}>
        <div className={styles['boxInputsStyle']}>
            <label htmlFor="title">Create Your Task: {state.titleValid === false && <span className={styles['styleError']}>Title Not Valid Must Be Greater-Then 10</span>}</label>
            <input type="text" className={`${styles['styleInput']} ${state.titleValid === false ? styles['notValid'] : styles['valid']}`} placeholder={"Create New task"} id={"title"} name={"title"} ref={titleField} required={true} value={state.title} onChange={handleChangeTitle} />
        </div>
        <div className={styles['boxInputsStyle']}>
            <label htmlFor="search">🔍 Search</label>
            <input type="search" className={`${styles['styleInput']} ${styles['valid']}`} id={'search'} placeholder={'🔍 Search'} onChange={handleSearch} ref={searchField} value={state.search} />
        </div>
        <div className={styles['boxInputsStyle']}>
            <label htmlFor="filter">Filter By Status</label>
            <select name="filterValue" id="filter" className={`${styles['styleInput']} ${styles['valid']}`} value={state.filter} ref={filterField} onChange={handleFiltered}>
                <option value="all">Show All</option>
                <option value='completed'>Completed</option>
                <option value='active'>Active</option>
            </select>
        </div>
        <button className={styles['styleFormBtn']} aria-label={"Button to Create New Task In Your Todo List"} type={"submit"}>Add New Task</button>

        <button onClick={handelSort} className={`${styles['styleFormBtn']} ${styles['sortBtn']}`}>Sort by Status</button>

        <button onClick={handleCleanCompleted} className={`${styles['styleFormBtn']} ${styles['cleanBtn']}`}>Clean Completed</button>
    </form>)
}