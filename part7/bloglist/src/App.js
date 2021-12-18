import React, { useEffect } from 'react'
import Blogs from './components/Blogs'
import Login from './components/Login'
import Notification from './components/Notification'
import './App.css'
import { useDispatch } from 'react-redux'
import { initializeUser } from './reducers/userReducer'
import Users from './components/Users'
import { Route, Switch } from 'react-router-dom'
import User from './components/User'
import Blog from './components/Blog'
import Navigation from './components/Navigation'
import Container from 'react-bootstrap/Container'
import Footer from './components/Footer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const userInfo = window.localStorage.getItem('userinfo')
    if (userInfo) {
      dispatch(initializeUser(JSON.parse(userInfo)))
    }
  }, [])

  return (
    <Container>
      <Navigation />

      <br />
      <Notification />

      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/blogs/:id'>
          <Blog />
        </Route>
        <Route path='/blogs'>
          <Blogs />
        </Route>
        <Route path='/users/:id'>
          <User />
        </Route>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/'>
          <Blogs />
        </Route>
      </Switch>

      <br />
      <Footer />
    </Container>
  )
}

export default App
