import React from "react";

import styles from "./Pagination.module.css"

export function Pagination(props) {

    const arrowBtnHandler = (e) => {
        const value = parseInt(e.target.dataset.value);
        if(value === 1 ){
            if(props.currentPage < props.pageCount) props.onPageBtn(props.currentPage + 1);
        } else if (value === -1){
            if(props.currentPage > 1) props.onPageBtn(props.currentPage - 1);
        }
    }

    const pageBtnHandler = (e) => {
        props.onPageBtn(parseInt(e.target.dataset.value));
    }

    const createPageBox = () => {
        const rows = []
        for(let i = 1; i <= props.pageCount; i++){
            rows.push(<a key={i} data-value={i} className={props.currentPage === i ? styles.active : ""} href="#" onClick={pageBtnHandler}>{i}</a>)
        }
        return rows
    }

    return (<div className={styles.pagination}>
        <a href="#" data-value={-1} onClick={arrowBtnHandler}>&laquo;</a>
        {
            createPageBox()
        }
        <a href="#" data-value={1} onClick={arrowBtnHandler}>&raquo;</a>
    </div>
    )
}

export function PageSize(props) {
    return (<div className={styles['page-size']}>10</div>)
}
