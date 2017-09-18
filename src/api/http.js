import axios from 'axios'

const APIEndpoint = `http://localhost:3004`
const TransactionsEndpoint = `${APIEndpoint}/transactions`

const getTransactions = () => {
  return axios.get(TransactionsEndpoint)
}

const addTransaction = transactionData => {}

export default {
  getTransactions
}
