import React, {useEffect} from "react";
import styles from "../style/ModularStyle.module.scss";
import {useTodoContext} from "../contexts/TodoProvider";
import {NOT_FOUND} from "../constants/actionTypes";

export const NotFoundPage = React.memo(() => {

    const {dispatch} = useTodoContext();

    useEffect(() => {
        dispatch({type: NOT_FOUND, payload: true});
    }, []);

    return <div className={styles.containerNotFound}>
        <h1 className={styles.notFound} data-content={'Page.Not.Found'}>Page.Not.Found</h1>
    </div>

})