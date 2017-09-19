import React, { PureComponent } from 'react'
import glamorous from 'glamorous'
import moment from 'moment'

class UnstyledTransactions extends PureComponent {
  render() {
    console.log('transactions table rendering')
    const { transactionsCount, transactions, ...rest } = this.props
    return (
      <div {...rest}>
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
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td data-label="Amount">{transaction.amount}</td>
                <td data-label="Due Date">{transaction.note}</td>
                <td data-label="Type">{transaction.type}</td>
                <td data-label="Balance">{transaction.balance}</td>
                <td data-label="Date">
                  {moment(transaction.date).format('Do MMM | h:mm a')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

const Transactions = glamorous(UnstyledTransactions)({
  margin: '0 auto',
  maxWidth: '97%',
  fontSize: '0.8em',
  marginTop: '18%',
  background: 'ghostwhite',
  padding: '20px 0px',
  boxShadow:
    '0 1px 1px rgba(0, 0, 0, 0.15), 0 10px 0 -5px #eee, 0 10px 1px -4px rgba(0, 0, 0, 0.15), 0 20px 0 -10px #eee, 0 20px 1px -9px rgba(0, 0, 0, 0.15)'
  /* Padding for demo purposes */
})

export default Transactions
