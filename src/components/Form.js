import React from 'react'

import Button from './Button'
import Note from './Note'

const Form = ({ handleChange, deposit, spend, note, depositAmt, spendAmt }) => {
  return (
    <div>
      <Note text={note} onChange={handleChange} />
      <Button onClick={deposit} theme="green">
        Add Deposit
      </Button>
      <Button onClick={spend} theme="red">
        Add Expense
      </Button>
      <div className="controls">
        <div className="control" id="deposit">
          <label htmlFor="">
            add &nbsp;
            {depositAmt}
          </label>
          <input
            onChange={handleChange}
            type="range"
            min={500}
            max={10000}
            step={500}
            name="deposit"
            value={depositAmt}
          />
        </div>

        <div className="control" id="spend">
          <label htmlFor="">
            spend &nbsp;
            {spendAmt}
          </label>
          <input
            onChange={handleChange}
            type="range"
            max={3000}
            step={50}
            name="spend"
            value={spendAmt}
          />
        </div>
      </div>
    </div>
  )
}

export default Form
