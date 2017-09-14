import React from 'react'

import glamorous from 'glamorous'

const Error = glamorous.p({
  fontSize: '0.5em',
  color: 'red'
})

const Note = ({ text, onChange, isValid }) => {
  return (
    <div>
      <textarea
        cols="50"
        className="note"
        rows="2"
        name="note"
        placeholder="Please add a note"
        value={text}
        onChange={onChange}
      />
      {!isValid && <Error>Note is required</Error>}
    </div>
  )
}

export default Note
