import React from "react";

import styles from "./Pagination.module.css"

export function Pagination(props) {
    return (<div className={styles.pagination}>
        <a href="#">&laquo;</a>
        <a className={styles.active} href="#">1</a>
        <a href="#">2</a>
        <a href="#">3</a>
        <a href="#">4</a>
        <a href="#">5</a>
        <a href="#">6</a>
        <a href="#">&raquo;</a>
    </div>
    )
}

export function PageSize(props) {
    return (<div className={styles['page-size']}>10</div>)
}
