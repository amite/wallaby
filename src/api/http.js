import axios from 'axios'

const APIEndpoint = `http://localhost:3004`
const TransactionsEndpoint = `${APIEndpoint}/transactions`

const loadTransactions = () => {
  return axios.get(TransactionsEndpoint)
}

const saveTransaction = transactionData => {
  return axios.post(TransactionsEndpoint, transactionData)
}

export default {
  loadTransactions,
  saveTransaction
}
