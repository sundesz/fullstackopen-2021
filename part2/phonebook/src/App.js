import React, { useEffect, useState } from 'react'
import phoneService from './services/phone'
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
    phoneService.getAll().then((persons) => setPersons(() => persons))
  }, [])

  const submitHandler = (e) => {
    e.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    if (checkDuplicateName()) {
      updatePhoneBook(checkDuplicateName().id, newPerson)
      return
    }

    phoneService
      .create(newPerson)
      .then((createdPerson) => setPersons(() => [...persons, createdPerson]))

    clearForm()
  }

  const checkDuplicateName = () =>
    persons.find((p) => p.name.toLowerCase() === newName.toLowerCase())
  const nameHandler = (e) => setNewName(() => e.target.value)
  const numberHandler = (e) => setNewNumber(() => e.target.value)
  const searchHandler = (e) => setSearchText(() => e.target.value)
  const clearForm = () => {
    setNewName(() => '')
    setNewNumber(() => '')
  }

  const deleteHandler = (id) => () => {
    const confirmDelete = window.confirm(
      `Delete ${persons.find((p) => p.id === id)?.name} ?`
    )

    if (confirmDelete) {
      phoneService
        .remove(id)
        .then(() => setPersons(() => persons.filter((p) => p.id !== id)))
        .catch((error) => console.log('Person already deleted'))
    }
  }

  const updatePhoneBook = (id, updateObj) => {
    const confirmUpdate = window.confirm(
      `${newName} is already added to phonebook, replace the old number with a new one?`
    )

    if (confirmUpdate) {
      phoneService
        .update(id, updateObj)
        .then((updatedPhone) =>
          setPersons(() => persons.map((p) => (p.id === id ? updatedPhone : p)))
        )
      clearForm()
    }
  }

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

      <Header title='Add a new' headerTag='h3' />
      <PersonForm
        onSubmit={submitHandler}
        newName={newName}
        nameHandler={nameHandler}
        newNumber={newNumber}
        numberHandler={numberHandler}
      />

      <Header title='Numbers' headerTag='h3' />
      <Persons persons={filteredPersons} deleteHandler={deleteHandler} />
    </div>
  )
}

export default App
