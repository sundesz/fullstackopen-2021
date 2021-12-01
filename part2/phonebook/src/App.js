import React, { useState } from 'react'

const App = () => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchText, setSearchText] = useState('')
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ])

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

  const checkDuplicateName = () => persons.map((p) => p.name).includes(newName)
  const nameHandler = (e) => setNewName(() => e.target.value)
  const numberHandler = (e) => setNewNumber(() => e.target.value)
  const searchHandler = (e) => setSearchText(() => e.target.value)

  const filteredPersons =
    searchText === ''
      ? persons
      : persons.filter((p) =>
          p.name.toLowerCase().includes(searchText.toLowerCase())
        )

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={searchText} onChange={searchHandler} />
      </div>

      <h2>add a new</h2>
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
      {filteredPersons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  )
}

export default App
