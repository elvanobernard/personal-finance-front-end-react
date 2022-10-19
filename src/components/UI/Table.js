import React from "react";

import {  SmallButton } from "./Button";
import {  SmallCard } from './Card'

import styles from "./Table.module.css"

const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
});

export function CashTable(props) {
    return (
        <div className={styles.container}>
            <table className={styles["cash-table"]}>
                <thead>
                    <tr>
                        <th>Account</th>
                        <th>Description</th>
                        <th>Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.rows.map(row => {
                            return (
                                <tr key={row.id}>
                                    <td>{row.name}</td>
                                    <td>{row.description}</td>
                                    <td>{formatter.format(row.balance)}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export function CategoryTable(props) {
    
    const editBtnHandler = (e) => {
        props.onEditBtn({...e.target.parentElement.parentElement.dataset});
    }

    return (
        <SmallCard className={styles.modal}>
            <div className={styles["container-small"]}>
                <table className={styles["category-table"]}>
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Budget</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.rows ?
                                props.rows.map((row, index) => {
                                    return (
                                        <tr key={row.id} data-id={row.id} data-budget={row.budget} data-name={row.name} data-index={index}>
                                            <td>{row.name}</td>
                                            <td>{formatter.format(row.budget)}</td>
                                            <td><SmallButton name="Edit" onClick={editBtnHandler}/></td>
                                        </tr>
                                    )
                                }) :
                                <tr></tr>
                        }
                    </tbody>
                </table>
            </div>
        </SmallCard>
    )
}

export function IncomeExpenseTable(props) {
    return (
        <div className={styles.container}>
            <table className={styles["income-expense-table"]}>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>No</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.rows.length > 0 ?
                            props.rows.map(row => {
                                return (
                                    <tr key={row.id}>
                                        <td>{row.date}</td>
                                        <td>{row.id}</td>
                                        <td>{row.description}</td>
                                        <td>{row.category}</td>
                                        <td>{formatter.format(row.amount)}</td>
                                    </tr>
                                )
                            }) : <tr></tr>
                    }
                </tbody>
            </table>
        </div>
    )
}

export function ReceivablePayableTable(props) {
    const formatter = Intl.NumberFormat("id-ID", { 'style': 'currency', 'currency': 'IDR' });

    const onPayButton = (e) => {
        props.onPayBtn(e.target.parentNode.parentNode.dataset.id);
    };

    return (
        <div className={styles.container}>
            <table className={styles["receivable-payable-table"]}>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Description</th>
                        <th>Total</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.rows.map(row => {
                            return (
                                <tr key={row.id} data-id={row.id}>
                                    <td>{row.id}</td>
                                    <td>{row.date}</td>
                                    <td>{row.paid ? "Paid" : "Unpaid"}</td>
                                    <td>{row.description}</td>
                                    <td>{formatter.format(row.amount)}</td>
                                    <td>{row.paid ? "-" : <SmallButton name="Pay" onClick={onPayButton} />}</td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </div>
    )
};
