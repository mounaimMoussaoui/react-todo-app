import React, {useCallback, useEffect, useRef} from "react";
import {Link, Outlet} from "react-router-dom";
import styles from "../style/ModularStyle.module.scss";
import {useTodoContext} from "../contexts/TodoProvider";
import {NOT_FOUND} from "../constants/actionTypes";


export const Layout = React.memo(() => {
    const listNav = useRef(null);

    const {state, dispatch} = useTodoContext();

    useEffect(() => {
        if(state.inNotFonded) {
            for (let i = 0; i < listNav.current.children.length; i++) {
                listNav.current.children[i].children[0].className = "";
            }
            dispatch({type: NOT_FOUND, payload: false});
        }
    }, [state]);

    const handleClickedLink = useCallback((e) => {
        for (let i = 0; i < listNav.current.children.length; i++) {
            listNav.current.children[i].children[0].className = "";
        }
        e.currentTarget.className = `${styles.active}`;
    }, [listNav]);

    return (
        <>
        <nav className={styles.navbar}>
            <ul ref={listNav}>
                <li>
                    <Link to="/home" onClick={handleClickedLink}>Home</Link>
                </li>
                <li>
                    <Link to="/About" onClick={handleClickedLink}>About</Link>
                </li>
            </ul>
        </nav>
            <div>
                <Outlet/>
            </div>
        </>
    )
})