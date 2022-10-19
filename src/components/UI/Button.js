import React from "react";

import styles from "./Button.module.css"

export function Button(props) {
    const button_class = props.className ? props.className : ""

    return (
        <button className={styles.btn + " " + button_class} onClick={props.onClick}>{props.name}</button>
    )
}

export function SmallButton(props) {
    const button_class = props.className ? props.className : ""

    return (
        <button className={styles['small-btn'] + " " + button_class} onClick={props.onClick}>{props.name}</button>
    )
}

export function EditButton(props) {
    const button_class = props.className ? props.className : ""

    return (
        <button className={styles['small-btn'] + " " + button_class} onClick={props.onClick}>{props.name}</button>
    )
}