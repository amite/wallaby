import axios from 'axios'

const APIEndpoint = `http://localhost:3004`
const TransactionsEndpoint = `${APIEndpoint}/transactions`

const getTransactions = () => {
  return axios.get(TransactionsEndpoint)
}

const saveTransaction = transactionData => {
  return axios.post(TransactionsEndpoint, transactionData)
}

export default {
  getTransactions,
  saveTransaction
}
