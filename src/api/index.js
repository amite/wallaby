const deposit = depositAmount => (prevState, props) => {
  const { balance } = {
    ...prevState,
    balance: prevState.balance + depositAmount
  }
  return { balance }
}

export const hasMinimumBalance = (balance, expenditure) =>
  balance - expenditure > 0

const spend = expenseAmount => (prevState, props) => {
  const { balance } = {
    ...prevState,
    balance: hasMinimumBalance(prevState.balance, expenseAmount)
      ? prevState.balance - expenseAmount
      : 0
  }
  return { balance }
}

export default {
  deposit,
  spend
}
