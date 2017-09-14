import React from 'react'

import Button from './Button'
import Note from './Note'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
const Form = ({
  /* actions  */
  addDeposit,
  createExpense,
  /* state  */
  deposit,
  spend,
  note,
  date,
  /* form ui state  */
  isValid,
  /* change handlers  */
  handleChange,
  onDateChange,
  onNoteChange
}) => {
  return (
    <div>
      <DatePicker
        selected={date}
        onChange={onDateChange}
        dateFormat="MMM Do YY"
      />
      <Note text={note} onChange={onNoteChange} isValid={isValid} />
      <Button disabled={isValid} onClick={addDeposit} theme="green">
        Add Deposit
      </Button>
      <Button disabled={isValid} onClick={createExpense} theme="red">
        Add Expense
      </Button>
      <div className="controls">
        <div className="control" id="deposit">
          <label htmlFor="">
            add &nbsp;
            {deposit}
          </label>
          <input
            onChange={handleChange}
            type="range"
            min={500}
            max={10000}
            step={500}
            name="deposit"
            value={deposit}
          />
        </div>

        <div className="control" id="spend">
          <label htmlFor="">
            spend &nbsp;
            {spend}
          </label>
          <input
            onChange={handleChange}
            type="range"
            max={3000}
            step={50}
            name="spend"
            value={spend}
          />
        </div>
      </div>
    </div>
  )
}

export default Form
