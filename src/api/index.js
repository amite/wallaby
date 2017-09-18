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

const calculateNewBalance = ({ oldBalance, amount, type }) =>
  type === DEPOSIT ? oldBalance + amount : oldBalance - amount

const setTransactions = transactionsData => (prevState, props) => {
  const newState = {
    ...prevState.data,
    transactions: [...transactionsData]
  }
  return { data: newState }
}

export const hasMinimumBalance = (balance, expenditure) =>
  balance - expenditure > 0

export default {
  addTransaction,
  setTransactions,
  calculateNewBalance
}
