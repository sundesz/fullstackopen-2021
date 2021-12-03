import React, { useEffect, useState } from 'react'
import phoneService from './services/phone'
import Filter from './components/Filter'
import Header from './components/Header'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import './app.css'
import Notification from './components/Notification'

const App = () => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchText, setSearchText] = useState('')
  const [persons, setPersons] = useState([])
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')

  useEffect(() => {
    phoneService.getAll().then((persons) => setPersons(() => persons))
  }, [])

  const submitHandler = (e) => {
    e.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    if (newName.trim() === '' || newNumber.trim() === '') {
      setNotification('Add both name and number', 'error')
      clearForm()
      return
    }

    if (checkDuplicateName()) {
      updatePhoneBook(checkDuplicateName().id, newPerson)
      return
    }

    phoneService
      .create(newPerson)
      .then((createdPerson) => {
        setPersons(() => [...persons, createdPerson])
        setNotification(`Added ${createdPerson.name}`, 'success')
      })
      .catch((error) => {
        setNotification('Error while adding new name', 'error')
      })

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
    const name = persons.find((p) => p.id === id)?.name
    const confirmDelete = window.confirm(`Delete ${name} ?`)

    if (confirmDelete) {
      phoneService
        .remove(id)
        .then(() => {
          setPersons(() => persons.filter((p) => p.id !== id))
          setNotification(`Deleted ${name}`, 'success')
        })
        .catch((error) => {
          setNotification(
            `Information of ${name} has already been removed from server`,
            'error'
          )
          console.log(
            `Information of ${name} has already been removed from server`
          )
        })
    }
  }

  const updatePhoneBook = (id, updateObj) => {
    const confirmUpdate = window.confirm(
      `${newName} is already added to phonebook, replace the old number with a new one?`
    )

    if (confirmUpdate) {
      phoneService
        .update(id, updateObj)
        .then((updatedPhone) => {
          setPersons(() => persons.map((p) => (p.id === id ? updatedPhone : p)))
          setNotification(`Updated ${updatedPhone.name}`, 'success')
        })
        .catch((error) => {
          setNotification(`Error while updating`, 'error')
        })
      clearForm()
    }
  }

  const setNotification = (notification, notificationType) => {
    setMessage(() => notification)
    setMessageType(() => notificationType)

    setTimeout(() => {
      setMessage(() => '')
      setMessageType(() => '')
    }, 10000)
  }

  const filteredPersons =
    searchText === ''
      ? persons
      : persons.filter((p) =>
          p.name.toLowerCase().includes(searchText.toLowerCase())
        )

  return (
    <div>
      <Header title='Phonebook' displayType='h2' />
      <Notification message={message} messageType={messageType} />

      <Filter searchText={searchText} searchHandler={searchHandler} />

      <Header title='Add a new' displayType='h3' />
      <PersonForm
        onSubmit={submitHandler}
        newName={newName}
        nameHandler={nameHandler}
        newNumber={newNumber}
        numberHandler={numberHandler}
      />

      <Header title='Numbers' displayType='h3' />
      <Persons persons={filteredPersons} deleteHandler={deleteHandler} />
    </div>
  )
}

export default App
