import React from "react";

import styles from "./Card.module.css"

export const Card = (props) => {

    const className = styles.container + " " + props.className

    return (
        <div className={className}>
            {props.children}
        </div>
    )
}

export const SmallCard = (props) => {
    const className = styles['small-container'] + " " + props.className
    return (
        <div className={className}>
            {props.children}
        </div>
    )
}