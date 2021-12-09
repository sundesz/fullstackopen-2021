import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Login from './components/Login'
import Notification from './components/Notification'
import blogService from './services/blogs'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const userInfo = window.localStorage.getItem('userinfo')
    if (userInfo) {
      setUser(() => JSON.parse(userInfo))
    }
  }, [])

  const logoutHandler = () => {
    setNotification(`${user.username} logged out`, 'success')
    setUser(() => null)
    window.localStorage.removeItem('userinfo')
  }

  const userInfo = (user) => {
    if (user === null) return null

    return (
      <div>
        <p>
          {user.name} logged in &nbsp;
          <button onClick={logoutHandler}>logout</button>
        </p>
      </div>
    )
  }

  const setNotification = (msg, msgType) => {
    setMessage(() => msg)
    setMessageType(() => msgType)

    setTimeout(() => {
      setMessage(() => null)
      setMessageType(() => null)
    }, 5000)
  }

  if (user === null) {
    return (
      <>
        <Notification message={message} messageType={messageType} />
        <Login setUser={setUser} setNotification={setNotification} />
      </>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={message} messageType={messageType} />

      {userInfo(user)}

      <Blogs
        blogs={blogs}
        setBlogs={setBlogs}
        user={user}
        setNotification={setNotification}
      />
    </div>
  )
}

export default App
