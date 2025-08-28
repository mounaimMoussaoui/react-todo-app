import React, {useCallback, useRef} from "react";
import {NavLink, Outlet, useNavigate} from "react-router-dom";
import styles from "../style/ModularStyle.module.scss";
import {motion} from "framer-motion";
import useSession from "../customsHooks/useSession";
import { FaHome,FaInfo } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";


export const Layout = React.memo(() => {
    const [userSession, setUserSession] = useSession( "user", null);
    const listNav = useRef(null);
    const navBarRef = useRef(null);
    const navigate = useNavigate();

    const handleClick = useCallback(async () => {
        await setUserSession(null);
        navigate("/login");
    //eslint-disable-next-line
    }, []);

    return (
        <>
            <motion.nav ref={navBarRef} className={styles.navbar} >
                <ul ref={listNav}>
                    <li>
                        <FaHome />
                        <NavLink to="/" className={ ({isActive}) =>  ( isActive ? styles.active : null) } >Home</NavLink>
                    </li>
                    <li >
                        <FaInfo />
                        <NavLink to="/about"  className={ ({isActive}) =>  ( isActive ? styles.active : null) } >About</NavLink>
                    </li>
                </ul>
                {userSession ? <motion.button className={styles.btnLogout} drag={'x'} dragConstraints={navBarRef}  initial={{scale: 0}} animate={{scale: 1, translateY: '-50%', transition: {duration: 0.3}}} whileTap={{y:-5, scale: 0.9}} onClick={handleClick}
                                      aria-label={"button to logout form the todo-app"}> <CiLogout /> <span>Logout</span> </motion.button> : null}
            </motion.nav>
            <div>
                <Outlet/>
            </div>
        </>
    )
})