import React from 'react'

const Transactions = ({ transactions, transactionsCount }) => {
  return (
    <div className="transactions">
      <table>
        <caption>
          Statement Summary <small>({transactionsCount} items)</small>
        </caption>
        <thead>
          <tr>
            <th scope="col">Amount</th>
            <th scope="col">Note</th>
            <th scope="col">Type</th>
            <th scope="col">Balance</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td data-label="Amount">{transaction.amount}</td>
              <td data-label="Due Date">{transaction.note}</td>
              <td data-label="Type">{transaction.type}</td>
              <td data-label="Balance">{transaction.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Transactions
