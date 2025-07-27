import styles from '../style/ModularStyle.module.scss';
import React from "react";

export const Loader = React.memo(() => {
    return (
        <div className={`${styles.loader}`}>
        </div>
    )
})