import React from 'react'
import Person from './Person'

const Persons = ({ persons, deleteHandler }) => {
  return (
    <div>
      {persons.map((person) => (
        <Person key={person.id} person={person} deleteHandler={deleteHandler} />
      ))}
    </div>
  )
}

export default Persons
