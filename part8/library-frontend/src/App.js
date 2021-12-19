import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import Authors from './components/Authors'
import Books from './components/Books'
import Navigation from './components/Navigation'
import NewBook from './components/NewBook'
import './App.css'
import Notification from './components/Notification'

const App = () => {
  const [notification, setNotification] = useState('')

  const displayNotification = (message) => {
    setNotification(message)

    setTimeout(() => setNotification(''), 5000)
  }

  return (
    <div>
      <Navigation />
      <Notification message={notification} />

      <Switch>
        <Route path='/authors'>
          <Authors displayNotification={displayNotification} />
        </Route>
        <Route path='/books'>
          <Books displayNotification={displayNotification} />
        </Route>
        <Route path='/addbook'>
          <NewBook displayNotification={displayNotification} />
        </Route>
        <Route path='/'>
          <Authors displayNotification={displayNotification} />
        </Route>
      </Switch>
    </div>
  )
}

export default App
