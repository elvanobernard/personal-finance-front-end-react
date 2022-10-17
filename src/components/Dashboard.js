import React from "react";

import styles from "./Dashboard.module.css"
import Box from "./UI/Box";
import { Button } from "./UI/Button";
import Chart from 'chart.js/auto'
import { Bar, Doughnut } from 'react-chartjs-2'
import DashboardItem from "./UI/DashboardItem";

// Bar Chart -> Budget vs Expense
// Bar Chart -> Budget vs Revenue
// Pie Chart -> Expense Composition
// Pie Chart -> Revenue Composition
// 
// 
const data = {
    datasets: [
        {
            label: 'Spending',
            // data: [50, 20],
            data: [{ x: "Home", y: 50 }, { x: 'Fitness', y: 20 }],
            backgroundColor: 'rgb(62, 35, 231)'
        },
        {
            // data: [70, 30],
            label: 'Budget',
            data: [{ x: "Home", y: 70 }, { x: 'Fitness', y: 30 }],
            backgroundColor: 'rgb(121, 108, 203)'
        }
    ],
    // labels: ['Home', 'Fitness']
}

const test = <Bar
    data={data}
/>

const data2 = {
    datasets: [
        {
            data: [50, 20],
            backgroundColor: ['rgb(62, 35, 231)', 'rgb(121, 108, 203)']
        }
    ],
    labels: ['Home', 'Fitness'],
}

const data3 = {

}

const test2 = <Doughnut data={data2}
    // width={'50%'}
    options={{
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: "Expense Composition",
            }
        }
    }}

/>


function DashBoard(props) {

    return (
        <div className={styles.container}>
            <div className={styles["box-container"]}>
                <Box title="Current Balance" amount={props.balance} />
                <Box title="Incomes" amount={props.incomeBalance} />
                <Box title="Expenses" amount={props.expenseBalance} />
            </div>
            <div className={styles["dashboard-container"]}>
                <DashboardItem>{test}</DashboardItem>
                <DashboardItem>{test2}</DashboardItem>
                <DashboardItem />
                <DashboardItem />
            </div>
        </div>
    )
}

export default DashBoard;