import React from "react";
import { Button } from "./Button";
import { Card, SmallCard } from "./Card"

import styles from "./Form.module.css"

export function IncomeExpenseForm(props) {
    const submitButtonHandler = () => {
        // TODO: Implement validator
        const account = document.querySelector('#trans-account-field')
        const category = document.querySelector('#trans-category-field')
        const date = document.querySelector('#trans-date-field')
        const description = document.querySelector('#trans-desc-field')
        const amount = document.querySelector('#trans-amount-field')
        const paid = document.querySelector('#paid-box')

        // if (!description.value) {
        //     description.value = ""
        //     console.log('Called');
        // };

        const data = {
            cash_account: account.value,
            category: category.value,
            date: date.value,
            description: description.value,
            amount: amount.value,
            cash: !paid.checked,
        }
        props.onSubmit(data, props.identifier)

    }

    return (
        <Card className={styles.modal}>
            <form className={styles["transaction-form"]}>
                <h2>New {props.title}</h2>
                <label>Account</label>
                <select id="trans-account-field">
                    {
                        props.cashAccounts.map(account => {
                            return <option key={account.id} value={account.id}>{account.name}</option>
                        })
                    }
                </select>
                <label>Category</label>
                <select id="trans-category-field">
                    {
                        props.categories.map(category => {
                            return <option key={category.id} value={category.id}>{category.name}</option>
                        })
                    }
                </select>
                <label>Date</label>
                <input id="trans-date-field" type="date"></input>
                <label>Description (Optional)</label>
                <input id="trans-desc-field" type="text"></input>
                <label>Amount</label>
                <input id="trans-amount-field" type="number"></input>
                <div id="trans-paid-field" className={styles.checkbox}>
                    <input type="checkbox" id="paid-box" name="paid" value={true} />
                    <label>Pay later?</label>
                </div>
            </form>
            <div className={styles["button-container"]}>
                <Button className={styles.button} name="Submit" onClick={submitButtonHandler} />
                <Button className={styles.button} name="Cancel" onClick={props.onClose} />
            </div>
        </Card>
    )
}

export function AccountForm(props) {
    // TODO: Implement validator
    const submitButtonHandler = () => {
        const name = document.querySelector('#cash-name-field');
        const description = document.querySelector('#cash-desc-field');
        const balance = document.querySelector('#cash-balance-field');

        const data = {
            name: name.value,
            description: description.value,
            balance: balance.value,
        }

        props.onSubmit(data)
    }

    return (
        <Card className={styles.modal}>
            <form className={styles["transaction-form"]}>
                <h2>New Account</h2>
                <label>Name</label>
                <input id="cash-name-field" type="text"></input>
                <label>Description</label>
                <input id="cash-desc-field" type="text"></input>
                <label>Initial Balance</label>
                <input id="cash-balance-field" type="number"></input>
            </form>

            <div className={styles["button-container"]}>
                <Button className={styles.button} name="New Account" onClick={submitButtonHandler} />
                <Button className={styles.button} name="Cancel" onClick={props.onClose} />
            </div>
        </Card>
    )
}

export function CategoryForm(props) {
    const submitButtonHandler = () => {
        const nameField = document.querySelector(`#category-name-field`);
        const budgetField = document.querySelector(`#category-budget-field`);
        const categoryName = nameField.value;
        const categoryBudget = parseInt(budgetField.value);
        if (categoryName.length > 0 && categoryBudget >= 0) {
            nameField.value = "";
            budgetField.value = "";
            const data = {
                'name': categoryName,
                'budget': categoryBudget,
            }

            if(props.data.id){
                data.id = props.data.id;
                props.onUpdate(data, props.identifier, props.data.index);
            } else {
                props.onSubmit(data, props.identifier);
            }
        } else {
            console.log(props.identifier)
            console.log("Invalid value")
        }
    }

    const title = props.data.id ? "Update Category" : "New Category"

    return (
        <Card className={styles.modal}>
            <form className={styles["transaction-form"]}>
                <h2>{title}</h2>
                <label>Name</label>
                <input id="category-name-field" type="text" defaultValue={props.data.name}></input>
                <label>Budget</label>
                <input id="category-budget-field" type="number" defaultValue={props.data.budget}></input>
            </form>

            <div className={styles["button-container"]}>
                <Button className={styles.button} name={title} onClick={submitButtonHandler} />
                <Button className={styles.button} name="Cancel" onClick={props.onClose} />
            </div>
        </Card>
    )
}

export function CreatePaymentForm(props) {

    const submitButtonHandler = () => {
        const id = document.querySelector(`#payment-id-data`);
        const account = document.querySelector(`#payment-account-field`);
        const date = document.querySelector(`#payment-date-field`);

        const data = {
            id: id.value,
            account: parseInt(account.value),
            date: date.value,
        };

        props.onSubmit(data, props.identifier);
    }

    return (
        <Card className={styles.modal}>
            <form className={styles["transaction-form"]}>
                <data id="payment-id-data" value={props.id} />
                <h2>Make Payment</h2>
                <label>Account</label>
                <select id="payment-account-field">
                    {
                        props.cashAccounts.map(account => {
                            return <option key={account.id} value={account.id}>{account.name}</option>
                        })
                    }
                </select>
                <label>Date</label>
                <input id="payment-date-field" type="date"></input>
            </form>

            <div className={styles["button-container"]}>
                <Button className={styles.button} name="Create Payment" onClick={submitButtonHandler} />
                <Button className={styles.button} name="Cancel" onClick={props.onClose} />
            </div>
        </Card>
    )
}

export function FilterForm(props) {
    return (
        <Card className={styles.modal}>
            <form className={styles["transaction-form"]}>
            <h2>Filter (Not Yet Implemented)</h2>
            <label>Description</label>
            <input type="text"></input>
            <div className={styles['filter-flex']}>
                <div>
                    <label>Start Date</label>
                    <input type="date"></input>
                </div>
                <div>
                    <label>End Date</label>
                    <input type="date"></input>
                </div>
            </div>
            <div className={styles['filter-flex']}>
                <div>
                    <label>Minimal Amount</label>
                    <input type="number"></input>
                </div>
                <div>
                    <label>Maximal Amount</label>
                    <input type="number"></input>
                </div>
            </div>
            </form>
            <div className={styles["button-container"]}>
                <Button className={styles.button} name="Filter" onClick={""} />
                <Button className={styles.button} name="Cancel" onClick={props.onClose} />
            </div>
        </Card>
    )
}