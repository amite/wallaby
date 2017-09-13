const deposit = depositAmount => (prevState, props) => {
  const data = {
    ...prevState.data,
    balance: prevState.data.balance + depositAmount
  }

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
