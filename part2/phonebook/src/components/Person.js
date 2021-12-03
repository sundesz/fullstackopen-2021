import React from 'react'

const Person = ({ person, deleteHandler }) => {
  return (
    <div>
      {person.name} {person.number}&nbsp;
      <button onClick={deleteHandler(person.id)}>Delete</button>
    </div>
  )
}

export default Person
