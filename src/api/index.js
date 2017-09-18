const deposit = ({ amount, note, date, balance }) => (prevState, props) => {
  const data = {
    ...prevState.data,
    transactions: [
      {
        type: 'Deposit',
        balance: balance + parseInt(amount, 10),
        amount: parseInt(amount, 10),
        note,
        date
      },
      ...prevState.data.transactions
    ]
  }

  return { data }
}

const loadTransactions = transactionsData => (prevState, props) => {
  const newState = {
    ...prevState.data,
    transactions: [...transactionsData, prevState.data.transactions],
    loading: false
  }
  return { data: newState }
}

const spend = ({ amount, note, date, balance }) => (prevState, props) => {
  const data = {
    ...prevState.data,
    transactions: [
      {
        type: 'Expense',
        balance: hasMinimumBalance(balance, amount)
          ? balance - parseInt(amount, 10)
          : 0,
        amount: parseInt(amount, 10),
        note,
        date
      },
      ...prevState.data.transactions
    ]
  }

  return { data }
}

export const hasMinimumBalance = (balance, expenditure) =>
  balance - expenditure > 0

export default {
  deposit,
  spend,
  loadTransactions
}
