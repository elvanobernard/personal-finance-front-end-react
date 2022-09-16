import React from "react";
import Button from "./Button";

import styles from "./CategoryForm.module.css"

function CategoryForm(props) {
    return (
        <React.Fragment>

        <form className={styles["transaction-form"]}>
            <h2>New Account/Category</h2>
            <label>Name</label>
            <input type="text"></input>
            <label>Description</label>
            <input type="text"></input>
            <label>Amount</label>
            <input type="number"></input>
        </form>
        <Button className={styles.button} name="New Account/Category"/>
        </React.Fragment>
    )
}

export default CategoryForm