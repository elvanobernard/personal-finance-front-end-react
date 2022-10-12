import React from "react";

import styles from "./Overlay.module.css"

function Overlay(props){
    return <div className={styles.overlay} onClick={props.onClick}></div>
}

export default Overlay;