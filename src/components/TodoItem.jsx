import {useTodoContext} from "../contexts/TodoProvider";
import styles from "../style/ModularStyle.module.scss";
import {
    EDIT_TODO, PUT_NOTIFICATION, SET_DELETED_ID,
    SET_DONE, SET_EDITING_TITLE,
    SET_MESSAGE_VALUE,
    SET_TITLE_VALUE
} from "../constants/actionTypes";
import React, {useCallback, useRef, useState} from "react";
import {motion} from "framer-motion";
import { GoTrash } from "react-icons/go";
import { CiEdit } from "react-icons/ci";

export const TodoItem = React.memo(({task, textDecoration, listTodos}) => {
    const { state, dispatch } = useTodoContext();
    const [showEditing, setShowEditing] = useState(false);
    const deleteBtn = useRef(null);
    const editBtn = useRef(null);
    const boxEdit = useRef(null);
    const editField = useRef(null);
    const checkDone = useRef(null);
    const titleTodo = useRef(null);

    const resetField = useCallback(() => {
        dispatch({type: SET_TITLE_VALUE, payload: ''});
        state.filter = "all";
    }, [dispatch, state]);

    const handleDel = useCallback((e) => {
        e.preventDefault();
        dispatch( {type: SET_DELETED_ID, payload: +e.currentTarget.dataset.id} )
        dispatch( {type: SET_MESSAGE_VALUE, payload: "Are you sure you want to delete?"} );
    }, [dispatch]);

    const handleDone = useCallback(() => {
        dispatch({type: SET_DONE, payload: {id: +checkDone.current.dataset.id, value: checkDone.current.checked}});
        resetField();
    }, [dispatch, resetField]);

    const handleTitleClick = useCallback(() => {
        setShowEditing(true);
        boxEdit.current.style.display = 'flex';
        editField.current.focus();
        dispatch({type: SET_EDITING_TITLE, payload: titleTodo.current.textContent});
    }, [dispatch]);

    const handleEditingField = useCallback(() => {
        dispatch({type: SET_EDITING_TITLE, payload: editField.current.value});
    }, [dispatch]);

    const handleBtnEdite = useCallback(() => {
        const idTask = editBtn.current.dataset.id;
        dispatch( {type: EDIT_TODO, payload: {id: +idTask, titleEditing: state.editTitle}});
        boxEdit.current.style.display = 'none';
        resetField();
        setShowEditing(false);
        dispatch({type: PUT_NOTIFICATION, payload: `Task Update Successfully`});
    }, [dispatch, resetField, state.editTitle]);

    const handelKeyPressEditing = useCallback((e) => {
        if (e.key === "Enter") {
            handleBtnEdite();
        }
        if (e.key === "Escape") {
           boxEdit.current.style.display = 'none';
        }
        setShowEditing(false);
    }, [handleBtnEdite]);
    
    const handleOutSideClick = useCallback(() => {
        handleBtnEdite();
    }, [handleBtnEdite]);

    return (<>
        <motion.li drag dragConstraints={listTodos} className={`${styles['styleTask']} ${textDecoration && styles['taskDone']} ${state.message ? styles["blockEvent"] : ""}`}>
            <input type="checkbox" className={styles['doneStyle']} data-id={task.id} name={"done"} onChange={handleDone} value={task.done} ref={checkDone} checked={task.done}/>
            <div className={styles['boxEditing']}>
                <span className={styles['spanTitleStyle']} ref={titleTodo} onClick={handleTitleClick}>{task.title}</span>
                <div className={`${styles['alertElementEditing']} ${showEditing && 'show'}`} ref={boxEdit}>
                    <input type="text" name={"titleOnEditing"} value={state.editTitle} ref={editField} onChange={handleEditingField} className={styles['inputStyleEditing']} data-id={task.id} placeholder={"Task Title On Editing...."} onKeyDown={handelKeyPressEditing} onBlur={handleOutSideClick}/>
                    <button data-id={task.id} className={`${styles['styleBtn']} ${styles['btnEditBackGround']}`} ref={editBtn} onClick={handleBtnEdite}><CiEdit /><span>Edit</span></button>
                </div>
            </div>
            <button className={`${styles['styleBtn']} ${styles['btnDelBackGround']}`} data-id={task.id} ref={deleteBtn} onClick={handleDel}><GoTrash /><span>delete</span></button>
        </motion.li>
    </>
    )
});