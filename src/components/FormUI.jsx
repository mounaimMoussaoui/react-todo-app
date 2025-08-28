import {useTodoContext} from "../contexts/TodoProvider";
import styles from "../style/ModularStyle.module.scss";
import {
    ADD_TODO,
    CLEAN_TODOS_DONE,
    FILTERED_TODOS, PUT_NOTIFICATION, SET_TITLE_VALID,
    SET_TITLE_VALUE,
    SET_VALUE_SEARCH,
    SORTED_LIST_TODO
} from "../constants/actionTypes";
import React, {useCallback, useRef} from "react";
import { MdAddTask, MdOutlineSort } from "react-icons/md";
import { GoTrash } from "react-icons/go";
export const FormUI = React.memo(() => {

    const { state, dispatch } = useTodoContext();
    const filterField = useRef(null);
    const searchField = useRef(null);
    const titleField = useRef(null);

    const resetField = useCallback(() => {
        dispatch({type: SET_TITLE_VALUE, payload: ''});
        dispatch({ type: FILTERED_TODOS, payload: 'all' });
    }, [dispatch]);

    const handleSubmit = useCallback((e) => {
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
    }, [state.titleValid, state.title, dispatch, state.todos, resetField]);

    const  handelSort = useCallback((e) => {
        e.preventDefault();
        dispatch({type: SORTED_LIST_TODO});
        resetField();
    }, [dispatch, resetField]);

    const handleCleanCompleted = useCallback((e) => {
        e.preventDefault();
        dispatch({type: CLEAN_TODOS_DONE});
        dispatch({type: PUT_NOTIFICATION, payload: `Deletion Of Completed Tasks Completed Successfully`});
        resetField();
    }, [dispatch, resetField]);

    const handleFiltered = useCallback(() => {
        dispatch({ type: FILTERED_TODOS, payload: filterField.current.value });
    }, [dispatch]);

    const handleSearch = useCallback(() => {
        dispatch({type: SET_VALUE_SEARCH, payload: searchField.current.value});
        resetField();
    }, [dispatch, resetField]);

    const handleChangeTitle = useCallback((e) => {
        dispatch({type: SET_TITLE_VALUE, payload: titleField.current.value});
        if((/\w.{10,}/gi).test(titleField.current.value)) {
            dispatch( {type: SET_TITLE_VALID, payload: true} );
        } else if(titleField.current.value !== "") {
            dispatch( {type: SET_TITLE_VALID, payload: false} );
        }
    }, [dispatch]);

    return (<form onSubmit={handleSubmit} id={'formControl'} className={styles['styleForm']}>
        <div className={styles['boxInputsStyle']}>
            <label htmlFor="title">Create Your Task: {state.titleValid === false && <span className={styles['styleError']}>Title Not Valid Must Be Greater-Then 10</span>}</label>
            <input type="text" className={`${styles['styleInput']} ${state.titleValid === false ? styles['notValid'] : styles['valid']}`} placeholder={"Create New task"} id={"title"} name={"title"} ref={titleField} required={true} value={state.title} onChange={handleChangeTitle} />
        </div>
        <div className={styles['boxInputsStyle']}>
            <label htmlFor="search">🔍 Search</label>
            <input type="search" name={'searchField'} className={`${styles['styleInput']} ${styles['valid']}`} id={'search'} placeholder={'🔍 Search'} onChange={handleSearch} ref={searchField} value={state.search} />
        </div>
        <div className={styles['boxInputsStyle']}>
            <label htmlFor="filter">Filter By Status</label>
            <select name="filterValue" id="filter" className={`${styles['styleInput']} ${styles['valid']}`} value={state.filter} ref={filterField} onChange={handleFiltered}>
                <option value="all">Show All</option>
                <option value='completed'>Completed</option>
                <option value='active'>Active</option>
            </select>
        </div>
        <button  className={styles['styleFormBtn']} aria-label={"Button to Create New Task In Your Todo List"} type={"submit"} disabled={ !state.titleValid } > <MdAddTask /><span>Add New Task</span></button>

        <button onClick={handelSort} aria-label={"Button to Create Sort Tasks In Your Todo List"} className={`${styles['styleFormBtn']} ${styles['sortBtn']}`}><MdOutlineSort /><span>Sort by Status</span></button>

        <button onClick={handleCleanCompleted} aria-label={"Button to Clean all complete Tasks"} className={`${styles['styleFormBtn']} ${styles['cleanBtn']}`}><GoTrash /><span>Clean Completed</span></button>
    </form>)
})