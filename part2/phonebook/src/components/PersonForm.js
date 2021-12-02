import React from 'react'

const PersonForm = ({
  onSubmit,
  newName,
  nameHandler,
  newNumber,
  numberHandler,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={newName} onChange={nameHandler} />
      </div>
      <div>
        number: <input value={newNumber} onChange={numberHandler} />
      </div>
      <div>
        <button type='submit'>Add</button>
      </div>
    </form>
  )
}

export default PersonForm
