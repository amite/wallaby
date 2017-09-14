import React from 'react'

import glamorous, { Div } from 'glamorous'

const Error = glamorous.p({
  fontSize: '0.5em',
  color: 'red'
})

const NoteStyles = {
  border: '1px solid #e5e3e3',
  padding: '10px',
  marginBottom: '5px',
  width: '70%'
}

const Note = ({ text, onChange, isValid }) => {
  return (
    <Div css={{ '& textarea': NoteStyles }}>
      <textarea
        cols="50"
        rows="2"
        name="note"
        placeholder="Please add a note"
        value={text}
        onChange={onChange}
      />
      {!isValid && <Error>Note is required</Error>}
    </Div>
  )
}

export default Note
