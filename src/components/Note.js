import React from 'react'

const Note = ({ text, onChange }) => {
  return (
    <div>
      <textarea
        id="note"
        cols="50"
        rows="2"
        name="note"
        placeholder="Please add a note"
        value={text}
        onChange={onChange}
      />
    </div>
  )
}

export default Note
