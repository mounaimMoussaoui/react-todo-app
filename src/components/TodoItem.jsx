import AlertBox from "./AlertBox";
import {useTodoContext} from "../contexts/TodoProvider";
import styles from "../style/ModularStyle.module.scss";
import {
    EDIT_TODO, SET_DELETED_ID,
    SET_DONE, SET_EDITING_TITLE,
    SET_MESSAGE_VALUE,
    SET_TITLE_VALUE
} from "../constants/actionTypes";
import {useRef, useState} from "react";

export default function TodoItem({task, textDecoration}) {
    const { state, dispatch } = useTodoContext();
    const [showEditing, setShowEditing] = useState(false);
    const deleteBtn = useRef(null);
    const editBtn = useRef(null);
    const boxEdit = useRef(null);
    const editField = useRef(null);
    const checkDone = useRef(null);
    const titleTodo = useRef(null);

    function resetField() {
        dispatch({type: SET_TITLE_VALUE, payload: ''});
        state.filter = "all";
    }

    function handleDel(e, action) {
        e.preventDefault();
        dispatch( {type: SET_DELETED_ID, payload: +e.currentTarget.dataset.id} )
        dispatch( {type: SET_MESSAGE_VALUE, payload: "Are you sure you want to delete?"} );
    }

    function handleDone() {
        dispatch({type: SET_DONE, payload: {id: +checkDone.current.dataset.id, value: checkDone.current.checked}});
        resetField();
    }

    function handleTitleClick() {
        setShowEditing(true);
        boxEdit.current.style.display = 'flex';
        editField.current.focus();
        dispatch({type: SET_EDITING_TITLE, payload: titleTodo.current.textContent});
    }

    function handleEditingField() {
        dispatch({type: SET_EDITING_TITLE, payload: editField.current.value});
    }

    function handleBtnEdite() {
        const idTask = editBtn.current.dataset.id;
        dispatch( {type: EDIT_TODO, payload: {id: +idTask, titleEditing: state.editTitle}} )
        boxEdit.current.style.display = 'none';
        resetField();
        setShowEditing(false);
    }

    function handelKeyPressEditing(e) {
        if (e.key === "Enter") {
            handleBtnEdite();
        }
        if (e.key === "Escape") {
           boxEdit.current.style.display = 'none';
        }
        setShowEditing(false);
    }
    
    function handleOutSideClick() {
        handleBtnEdite();
    }

    return (<>
        <li className={`${styles['styleTask']} ${textDecoration && styles['taskDone']} ${state.message ? styles["blockEvent"] : ""}`}>
            <input type="checkbox" className={styles['doneStyle']} data-id={task.id} name={"done"} onChange={handleDone} value={task.done} ref={checkDone} checked={task.done}/>
            <div className={styles['boxEditing']}>
                <span className={styles['spanTitleStyle']} ref={titleTodo} onClick={handleTitleClick}>{task.title}</span>
                <div className={`${styles['alertElementEditing']} ${showEditing && 'show'}`} ref={boxEdit}>
                    <input type="text" value={state.editTitle} ref={editField} onChange={handleEditingField} className={styles['inputStyleEditing']} data-id={task.id} onKeyDown={handelKeyPressEditing} onBlur={handleOutSideClick}/>
                    <button data-id={task.id} className={`${styles['styleBtn']} ${styles['btnEditBackGround']}`} ref={editBtn} onClick={handleBtnEdite}>Edit</button>
                </div>
            </div>
            <button className={`${styles['styleBtn']} ${styles['btnDelBackGround']}`} data-id={task.id} ref={deleteBtn} onClick={handleDel}>delete</button>
        </li>
        { state.message ? <AlertBox /> : ""}
    </>
    )
}