import styles from '../style/ModularStyle.module.scss';
import React from "react";
import {motion} from "framer-motion";

export const Loader = React.memo(() => {
    return (
        <motion.div  initial={{scale: 0.5}} animate={{scale: 1, transition: {duration: 0.5}}} className={`${styles.loader}`}>
        </motion.div>
    )
})