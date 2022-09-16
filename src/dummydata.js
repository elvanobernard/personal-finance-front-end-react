export const dummy_balance_summary = [
    {
        "id": 1,
        "payable_balance": 500000,
        "receivable_balance": 1000000,
        "cash_balance": 500000
    }
]

export const dummy_monthly_expense = [
    {
        "id": 1,
        "month": 10,
        "year": 2022,
        "expense_category": 1,
        "balance": 0,
        "expense_entries": [
            1, 2
        ]
    }
]

export const dummy_monthly_income = [
    {
        "id": 1,
        "month": 10,
        "year": 2022,
        "income_category": 1,
        "balance": 0,
        "income_entries": [
            1, 2
        ]
    },
]

export const dummy_payable = [
    {
        "id": 1,
        "amount": 500000,
        "paid": false,
        "expense_entry": 2,
        "cash_entry": []
    },
]

export const dummy_receivable = [
    {
        "id": 1,
        "amount": 1000000,
        "paid": false,
        "income_entry": 2,
        "cash_entry": []
    },
]

export const dummy_cash_entries = [
    {
        "id": 1,
        "cash_account": 1,
        "amount": 500000,
        "transaction": 1,
        "payables": [],
        "receivables": []
    },
    {
        "id": 2,
        "cash_account": 1,
        "amount": 1000000,
        "transaction": 3,
        "payables": [],
        "receivables": []
    },
]

export const dummy_cash_account = [
    {
        "id": 1,
        "name": "BCA",
        "description": "Saving Account",
        "total": 500000,
        "cash_entries": [],
    },
]

export const dummy_income_entries = [
    {
        "id": 1,
        "income_category": 1,
        "amount": 1000000,
        "transaction": 3,
        "monthly_summary": 1,
        "receivables": [],        
        "date": new Date(2022, 9, 5), // TODO Research table join, this field not included in model
        "description": "Revenue from somewhere only whe know", // TODO Research table join
        "category_name": 'Home',
    },
    {
        "id": 2,
        "income_category": 1,
        "amount": 1000000,
        "transaction": 4,
        "monthly_summary": 1,
        "receivables": [],        
        "date": new Date(2022, 9, 5), // TODO Research table join, this field not included in model
        "description": "Revenue from somewhere only we know (receivable)", // TODO Research table join
        "category_name": 'Home',
    },
]

export const dummy_income_category = [
    {
        "id": 1,
        "name": "Somewhere only we know",
        "target": 1000000,
        "monthly_income_summaries": [
            1
        ],
        "income_entries": [
            1
        ]
    },
]

export const dummy_expense_entries = [
    {
    id: 1,
    expense_category: 1,
    amount: 500000,
    transaction: 1,
    monthly_summary: 1,
    payables: [],
    date: new Date(2022, 9, 5), // TODO Research table join, this field not included in model
    description: "Purchase of mercedes benz", // TODO Research table join
    category_name: 'Home'
    },
    {
    id: 2,
    expense_category: 1,
    expense_category_name: "Home", // TODO: implement this in the backend, just store the instead of linking it everytime loaded into the browser
    amount: 500000,
    transaction: 2,
    monthly_summary: 1,
    payables: [],
    date: new Date(2022, 9, 5), // TODO Research table join, this field not included in model
    description: "Warteg (payable), not enough cash on hand", // TODO Research table join
    category_name: 'Home'
    },
]

export const dummy_expense_category = [
    {
        id: 1,
        name: "home",
        budget: 500000,
        monthly_expense_summaries: [
            1,
        ],
        expense_entries: [
            1,
        ]
    },
]

export const dummy_transactions = [
    {
        id: 1,
        date: new Date(2022, 9, 5),
        description: "Purchase of mercedes benz"
    },
    {
        id: 2,
        date: new Date(2022, 9, 5),
        description: "Warteg (payable), not enough cash on hand"
    },
    {
        id: 3,
        date: new Date(2022, 9, 5),
        description: "Revenue from somewhere only whe know"
    },
    {
        id: 4,
        date: new Date(2022, 9, 5),
        description: "Revenue from somewhere only we know (receivable)"
    },
    {
        id: 5,
        date: new Date(2022, 9, 5),
        description: "Purchase of item"
    },
    {
        id: 6,
        date: new Date(2022, 9, 5),
        description: "Purchase of item"
    },
]
