import React from "react";
import styles from "../style/ModularStyle.module.scss";
import {motion} from "framer-motion";

export const About = React.memo(() => {
   return <motion.h2 className={styles.container} initial={{scale: 4, opacity:0.5}} animate={{scale: 1, opacity: 1, transition: {duration: 0.4}}} >Abouts</motion.h2>;
});