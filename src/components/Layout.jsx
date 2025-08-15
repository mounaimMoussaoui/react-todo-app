import React, {useCallback, useEffect, useRef} from "react";
import {Link, Outlet} from "react-router-dom";
import styles from "../style/ModularStyle.module.scss";
import {useTodoContext} from "../contexts/TodoProvider";
import {NOT_FOUND, SET_USER} from "../constants/actionTypes";
import {motion} from "framer-motion";
import useSession from "../customsHooks/useSession";

export const Layout = React.memo(() => {
    const [, setUserSession] = useSession( "user", null);
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

    const handleClick = useCallback(() => {
        dispatch({type: SET_USER, payload: null});
        setUserSession(null);
    }, []);


    return (
        <>
        <nav className={styles.navbar}>
            <ul ref={listNav}>
                <li>
                    <Link to="/" onClick={handleClickedLink} className={`${styles.active}`}>Home</Link>
                </li>
                <li>
                    <Link to="/About" onClick={handleClickedLink}>About</Link>
                </li>
            </ul>
            {state.user ? <motion.button className={styles.btnLogout} drag={'x'}  initial={{scale: 0}} animate={{scale: 1, translateY: '-50%', transition: {duration: 0.3}}} onClick={handleClick}
                                  aria-label={"button to logout form the todo-app"}>Logout</motion.button> : null}
        </nav>
            <div>
                <Outlet/>
            </div>
        </>
    )
})