import { DEPOSIT } from '../App'

const addTransaction = newTransactionData => (prevState, props) => {
  const data = {
    ...prevState.data,
    transactions: [...prevState.data.transactions, newTransactionData]
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
