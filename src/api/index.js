import { DEPOSIT } from '../App'

const addTransaction = newTransactionData => (prevState, props) => {
  const data = {
    ...prevState.data,
    transactions: [...prevState.data.transactions, newTransactionData],
    currentBalance: newTransactionData.balance
  }

  return { data }
}

const latestTransactionBalance = transactionsData => {
  return (
    transactionsData && transactionsData[transactionsData.length - 1].balance
  )
}

const calculateNewBalance = ({ oldBalance, amount, type }) =>
  type === DEPOSIT ? oldBalance + amount : oldBalance - amount

const getTransactionsAndBalance = (transactionsData, { currentBalance }) => (
  prevState,
  props
) => {
  const newState = {
    ...prevState.data,
    transactions: [...transactionsData],
    currentBalance
  }
  return { data: newState }
}

export const hasMinimumBalance = (balance, expenditure) =>
  balance - expenditure > 0

export default {
  addTransaction,
  getTransactionsAndBalance,
  calculateNewBalance,
  latestTransactionBalance
}
