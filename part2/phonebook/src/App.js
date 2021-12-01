import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
  const [newName, setNewName] = useState('')

  const checkName = () => {
    return persons.map((p) => p.name).includes(newName)
  }

  const submitHandler = (e) => {
    e.preventDefault()

    if (checkName()) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const newObj = { name: newName }
    setPersons(() => [...persons, newObj])
    setNewName(() => '')
  }

  const newNameHandler = (e) => {
    setNewName(() => e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={submitHandler}>
        <div>
          name: <input value={newName} onChange={newNameHandler} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>{person.name}</p>
      ))}
    </div>
  )
}

export default App
