import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' },
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const checkDuplicateName = () => {
    return persons.map((p) => p.name).includes(newName)
  }

  const submitHandler = (e) => {
    e.preventDefault()

    if (checkDuplicateName()) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const newObj = { name: newName, number: newNumber }
    setPersons(() => [...persons, newObj])
    setNewName(() => '')
    setNewNumber(() => '')
  }

  const nameHandler = (e) => setNewName(() => e.target.value)

  const numberHandler = (e) => setNewNumber(() => e.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={submitHandler}>
        <div>
          name: <input value={newName} onChange={nameHandler} />
        </div>
        <div>
          number: <input value={newNumber} onChange={numberHandler} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  )
}

export default App
