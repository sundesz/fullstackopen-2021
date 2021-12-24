import React, { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import Authors from './components/Authors'
import Books from './components/Books'
import Navigation from './components/Navigation'
import NewBook from './components/NewBook'
import './App.css'
import Notification from './components/Notification'
import Login from './components/Login'
import Recommend from './components/Recommend'
import { useApolloClient, useLazyQuery, useSubscription } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from './queries'
import Container from 'react-bootstrap/Container'

const App = () => {
  const client = useApolloClient()
  const [token, setToken] = useState(null)
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState('')
  const [notificationType, setNotificationType] = useState('success')

  const [getBooks, bookResult] = useLazyQuery(ALL_BOOKS, {
    variables: { genre: filter },
  })

  useEffect(() => {
    const userInfo = window.localStorage.getItem('userinfo')
    if (userInfo) {
      setToken(userInfo)
    }
  }, [])

  const updateCacheWith = (addedBook) => {
    const booksInStore = client.readQuery({
      query: ALL_BOOKS,
      variables: { genre: filter },
    })

    const isBookAlreadyExists = (set, object) =>
      set.map((p) => p.id).includes(object.id)
    if (
      booksInStore &&
      !isBookAlreadyExists(booksInStore.allBooks, addedBook)
    ) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: booksInStore.allBooks.concat(addedBook) },
      })
    }

    const authorsInStore = client.readQuery({ query: ALL_AUTHORS })
    const isAuthorAlreadyExists = (set, object) =>
      set.find((p) => p.name === object.name)
    if (
      authorsInStore &&
      !isAuthorAlreadyExists(authorsInStore.allAuthors, addedBook.author)
    ) {
      client.writeQuery({
        query: ALL_AUTHORS,
        data: { allAuthors: [...authorsInStore.allAuthors, addedBook.author] },
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      displayNotification(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    },
  })

  const displayNotification = (message, type = 'success') => {
    setNotification(message)
    setNotificationType(type)
    setTimeout(() => setNotification(''), 5000)
  }

  return (
    <Container>
      <Navigation token={token} setToken={setToken} />
      <Notification message={notification} type={notificationType} />

      <Switch>
        <Route path='/login'>
          <Login
            displayNotification={displayNotification}
            setToken={setToken}
          />
        </Route>
        <Route path='/authors'>
          <Authors displayNotification={displayNotification} token={token} />
        </Route>
        <Route path='/books'>
          <Books
            filter={filter}
            setFilter={setFilter}
            getBooks={getBooks}
            bookResult={bookResult}
          />
        </Route>
        <Route path='/recommend'>
          <Recommend />
        </Route>
        <Route path='/addbook'>
          <NewBook
            displayNotification={displayNotification}
            updateCacheWith={updateCacheWith}
          />
        </Route>
        <Route path='/'>
          <Authors displayNotification={displayNotification} />
        </Route>
      </Switch>
    </Container>
  )
}

export default App
