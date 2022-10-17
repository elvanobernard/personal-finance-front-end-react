import React from "react";

import { Button, SmallButton } from "./Button";
import { Card, SmallCard } from './Card'

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
    console.log(props.rows)

    return (
        <SmallCard className={styles.modal}>
            <div className={styles["container-small"]}>
                <table className={styles["category-table"]}>
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.rows ?
                                props.rows.map(row => {
                                    return (
                                        <tr key={row.id}>
                                            <td>{row.name}</td>
                                            <td><SmallButton name="Edit" /></td>
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
