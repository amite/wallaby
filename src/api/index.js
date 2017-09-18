import { DEPOSIT } from '../App'

const addTransaction = ({ amount, note, date, balance, type }) => (
  prevState,
  props
) => {
  const data = {
    ...prevState.data,
    transactions: [
      ...prevState.data.transactions,
      {
        type,
        balance,
        amount: parseInt(amount, 10),
        note,
        date
      }
    ]
  }

  return { data }
}

const getNewBalance = ({ oldBalance, amount, type }) =>
  type === DEPOSIT ? oldBalance + amount : oldBalance - amount

const loadTransactions = transactionsData => (prevState, props) => {
  const newState = {
    ...prevState.data,
    transactions: [...transactionsData]
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
  spend,
  addTransaction,
  loadTransactions,
  getNewBalance
}
