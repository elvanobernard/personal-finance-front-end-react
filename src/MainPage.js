import React, { useEffect, useState } from "react";
import NavigationPane from "./components/NavigationPane/NavigationPane.js"
import DashBoard from "./components/Dashboard.js"
import IncomeExpense from "./components/IncomeExpense.js";
import Cash from "./components/Cash.js";
import ReceivablePayable from "./components/ReceivablePayable.js";
import Overlay from "./components/UI/Overlay.js";

import axios from "axios"
import { Route, Switch, Redirect } from "react-router-dom"
import {host, PAGE_ID} from "./constant"

import styles from "./MainPage.module.css"

const getSum = (arr, property) => {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i][property]
    }

    return sum
}

function MainPage() {


    const [form, setForm] = useState("");
    const [balance, setBalance] = useState({
        "cash_balance": 0,
        "receivable_balance": 0,
        "payable_balance": 0,
    });
    const [incomeSummary, setIncomeSummary] = useState([]);
    const [expenseSummary, setExpenseSummary] = useState([]);
    const [cashAccounts, setCashAccounts] = useState([]);
    const [expenseCategories, setExpenseCategories] = useState([]);
    const [incomeCategories, setIncomeCategories] = useState([]);

    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    });

    const submitNewCashAccount = async (data) => {
        const endpoint = 'cash-accounts/';

        axios.post(`${host}${endpoint}`, data)
            .then(res => {
                const accounts = cashAccounts
                accounts.push(res.data);
                setCashAccounts(accounts)
                closeHandler()
            }).catch(err => {
                console.log(err)
            })
    };

    const submitNewCategory = async (data, identifier) => {
        const endpoint = identifier === PAGE_ID.EXPENSE ? 'expense-categories/' : 'income-categories/';
        axios.post(`${host}${endpoint}`, data)
            .then(res => {
                if (identifier === PAGE_ID.EXPENSE) {
                    const categories = expenseCategories;
                    categories.push(res.data);
                    setExpenseCategories(categories);
                } else if (identifier === PAGE_ID.INCOME) {
                    const categories = incomeCategories;
                    categories.push(res.data);
                    setIncomeCategories(categories);
                }
                closeHandler();
            }).catch((err) => {
                console.log(err);
            })
    };

    const makePayment = async (data, identifier) => {
        console.log(data);
        const endpoint = identifier === PAGE_ID.PAYABLE ? 'payables/' : 'receivables/'
        const payable = await axios.get(`${host}${endpoint}${data.id}/`);
        const payableData = payable.data
        payableData.paid = true;
        payableData.payment_date = data.date;
        payableData.cash_account = data.account;
        console.log(payableData);
        axios.put(`${host}${endpoint}${data.id}/`, payableData)
            .then(res => {
                console.log(res);
                closeHandler()
            }).catch(err => {
                console.log(err);
            })
    };

    const closeHandler = () => {
        setForm("")
    }

    const formOpenHandler = (form) => {
        setForm(form)
    }

    async function getData() {
        // Obtain initial data from back-end
        try {
            const balanceSummary = axios.get(`${host}balance-summary/`);
            const time = new Date();
            const year = time.getFullYear();
            const month = time.getMonth() + 1;
            const expenseSummary = axios.get(`${host}monthly-expense-summary/${year}/${month}`);
            const incomeSummary = axios.get(`${host}monthly-income-summary/${year}/${month}`);
            const accounts = axios.get(`${host}cash-accounts/`)
            const expenseCategories = axios.get(`${host}expense-categories/`)
            const incomeCategories = axios.get(`${host}income-categories/`)

            Promise.allSettled([balanceSummary, expenseSummary, incomeSummary, accounts, expenseCategories, incomeCategories]).then((results) => {
                setBalance(results[0].value.data[0])
                setExpenseSummary(results[1].value.data);
                setIncomeSummary(results[2].value.data);
                setCashAccounts(results[3].value.data)
                setExpenseCategories(results[4].value.data)
                setIncomeCategories(results[5].value.data)
            });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData();
    }, [])


    const cashBalance = formatter.format(balance.cash_balance)
    const payableBalance = formatter.format(balance.payable_balance)
    const receivableBalance = formatter.format(balance.receivable_balance)

    let expenseBalance = expenseSummary.length ? getSum(expenseSummary, 'balance') : 0;
    let incomeBalance = incomeSummary.length ? getSum(incomeSummary, 'balance') : 0;
    let expenseBudget = expenseSummary.length ? getSum(expenseCategories, 'budget') : 0;
    let incomeBudget = incomeSummary.length ? getSum(incomeCategories, 'budget') : 0;
    const incomeSaving = formatter.format(incomeBalance - incomeBudget);
    const expenseSaving = formatter.format(expenseBudget - expenseBalance);

    expenseBalance = formatter.format(expenseBalance);
    incomeBalance = formatter.format(incomeBalance);
    expenseBudget = formatter.format(expenseBudget);
    incomeBudget = formatter.format(incomeBudget);

    return (
        <div className={styles.container}>
            <NavigationPane onClick={closeHandler} />
            {form}
            {form ? <Overlay onClick={closeHandler} /> : ""}
            <Switch>
                <Route path="/" exact>
                    <Redirect to="/dashboard" />
                </Route>
                <Route path="/expenses">
                    <IncomeExpense title="Expense"
                        identifier={PAGE_ID.EXPENSE}
                        onModalOpen={formOpenHandler}
                        onFormClose={closeHandler}
                        balance={expenseBalance}
                        summary={expenseSummary}
                        budget={expenseBudget}
                        saving={expenseSaving}
                        categories={expenseCategories}
                        cashAccounts={cashAccounts}
                        formatter={formatter}
                        onCategoryBtn={submitNewCategory}
                    />
                </Route>
                <Route path="/incomes">
                    <IncomeExpense title="Income"
                        identifier={PAGE_ID.INCOME}
                        onModalOpen={formOpenHandler}
                        onFormClose={closeHandler}
                        balance={incomeBalance}
                        summary={incomeSummary}
                        budget={incomeBudget}
                        saving={incomeSaving}
                        categories={incomeCategories}
                        cashAccounts={cashAccounts}
                        formatter={formatter}
                        onCategoryBtn={submitNewCategory}
                    />
                </Route>
                <Route path="/dashboard">
                    <DashBoard balance={cashBalance}
                        identifier={PAGE_ID.DASHBOARD}
                        expenseBalance={expenseBalance}
                        incomeBalance={incomeBalance}
                        formatter={formatter}
                    />
                </Route>
                <Route path="/cash" >
                    <Cash onModalOpen={formOpenHandler} onFormClose={closeHandler}
                        identifier={PAGE_ID.CASH}
                        cashBalance={cashBalance}
                        payableBalance={payableBalance}
                        receivableBalance={receivableBalance}
                        cashAccounts={cashAccounts}
                        onNewAccBtn={submitNewCashAccount}
                    />
                </Route>
                <Route path="/payables">
                    <ReceivablePayable title="Payable"
                        onModalOpen={formOpenHandler}
                        onFormClose={closeHandler}
                        identifier={PAGE_ID.PAYABLE}
                        cashAccounts={cashAccounts}
                        balance={payableBalance}
                    />
                </Route>
                <Route path="/receivables">
                    <ReceivablePayable title="Receivable"
                        onModalOpen={formOpenHandler}
                        onFormClose={closeHandler}
                        identifier={PAGE_ID.RECEIVABLE}
                        cashAccounts={cashAccounts}
                        balance={receivableBalance}
                    />
                </Route>
            </Switch>
        </div>
    )
}

export default MainPage