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


const processData = (summaries) => {
    const randomColor = () => "#" + Math.floor(Math.random()*16777215).toString(16);

    const data = {
        spending: [],
        budget: [],
        labels: [],
        backgroundColor: []
    }

    for(let i = 0; i < summaries.length; i++){
        const summary = summaries[i];
        data.spending.push(summary.balance)
        data.budget.push(summary.category.budget)
        data.labels.push(summary.category.name)
        data.backgroundColor.push(randomColor())
    }

    return data;
};

const getBarChart = (dataset, title) => {
    const data = {
        datasets: [
            {
                label: 'Actual',
                data: dataset.spending,
                backgroundColor: 'rgb(62, 35, 231)'
            },
            {
                label: 'Budget',
                data: dataset.budget,
                backgroundColor: 'rgb(121, 108, 203)'
            }
        ],
        labels: dataset.labels
    }

    const options = {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Budget vs Actual'
          }
        }
      }

    return (
    <React.Fragment>
        <Bar
        data={data}
        options={options}
        />
    </React.Fragment>
)

}

const getDoughnutChart = (dataset) => {
    const data = {
        datasets: [
            {
                data: dataset.spending,
                backgroundColor: dataset.backgroundColor
            }
        ],
        labels: dataset.labels,
    }
    
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: 'Composition'
          }
        }
      }

    return (
    <React.Fragment>
        <Doughnut data={data}
        options={options}/>
    </React.Fragment>
    )
}


function DashBoard(props) {

    const expenseData = processData(props.expenseSummary);
    const incomeData = processData(props.incomeSummary);

    return (
        <div className={styles.container}>
            <div className={styles["box-container"]}>
                <Box title="Current Balance" amount={props.balance} />
                <Box title="Incomes" amount={props.incomeBalance} />
                <Box title="Expenses" amount={props.expenseBalance} />
            </div>
            <div className={styles["dashboard-container"]}>
                <DashboardItem>{getBarChart(expenseData)}</DashboardItem>
                <DashboardItem>{getDoughnutChart(expenseData)}</DashboardItem>
                <DashboardItem>{getBarChart(incomeData)}</DashboardItem>
                <DashboardItem>{getDoughnutChart(incomeData)}</DashboardItem>
            </div>
        </div>
    )
}

export default DashBoard;