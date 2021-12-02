import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Header from './components/Header'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchText, setSearchText] = useState('')
  const [persons, setPersons] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((response) => setPersons(() => response.data))
  }, [])

  const submitHandler = (e) => {
    e.preventDefault()

    if (checkDuplicateName()) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const newObj = { name: newName, number: newNumber, id: persons.length + 1 }
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
      <Header title='Phonebook' headerTag='h2' />
      <Filter searchText={searchText} searchHandler={searchHandler} />

      <Header title='Add person' headerTag='h3' />
      <PersonForm
        onSubmit={submitHandler}
        newName={newName}
        nameHandler={nameHandler}
        newNumber={newNumber}
        numberHandler={numberHandler}
      />

      <Header title='Numbers' headerTag='h3' />
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App
