import React, {useCallback, useEffect, useRef} from "react";
import {Link, Outlet, useNavigate} from "react-router-dom";
import styles from "../style/ModularStyle.module.scss";
import {useTodoContext} from "../contexts/TodoProvider";
import {NOT_FOUND} from "../constants/actionTypes";
import {motion} from "framer-motion";
import useSession from "../customsHooks/useSession";
import { FaHome } from "react-icons/fa";
import { FaInfo } from "react-icons/fa";



export const Layout = React.memo(() => {
    const [userSession, setUserSession] = useSession( "user", null);
    const listNav = useRef(null);
    const {state, dispatch} = useTodoContext();
    const navigate = useNavigate();

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
        setUserSession(null);
        navigate("/login");
    }, []);


    return (
        <>
        <nav className={styles.navbar}>
            <ul ref={listNav}>
                <li>
                    <FaHome />
                    <Link to="/" onClick={handleClickedLink} className={`${styles.active}`}>Home</Link>
                </li>
                <li>
                    <FaInfo />
                    <Link to="/About" onClick={handleClickedLink}>About</Link>
                </li>
            </ul>
            {userSession ? <motion.button className={styles.btnLogout} drag={'x'}  initial={{scale: 0}} animate={{scale: 1, translateY: '-50%', transition: {duration: 0.3}}} whileTap={{y:-5, scale: 0.9}} onClick={handleClick}
                                  aria-label={"button to logout form the todo-app"}>Logout</motion.button> : null}
        </nav>
            <div>
                <Outlet/>
            </div>
        </>
    )
})