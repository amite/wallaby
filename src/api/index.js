const deposit = ({ amount, note, date, balance }) => (prevState, props) => {
  // debugger
  const data = {
    ...prevState.data,
    transactions: [
      {
        type: 'Deposit',
        balance: balance + parseInt(amount, 10),
        amount,
        note,
        date
      },
      ...prevState.data.transactions
    ]
  }

  console.log(data)

  return { data }
}

export const hasMinimumBalance = (balance, expenditure) =>
  balance - expenditure > 0

const spend = expenseAmount => (prevState, props) => {
  const data = {
    ...prevState.data,
    balance: hasMinimumBalance(prevState.data.balance, expenseAmount)
      ? prevState.data.balance - expenseAmount
      : 0
  }
  return { data }
}

export default {
  deposit,
  spend
}
