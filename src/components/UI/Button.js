import React from "react";

import styles from "./Button.module.css"

function Button(props) {
    const button_class = props.className? props.className : ""

    return (
        <button className={styles.btn + " " + button_class} onClick={props.onClick}>{props.name}</button>
    )
}

export default Button;