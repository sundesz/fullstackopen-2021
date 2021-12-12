import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { displayNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const submitHandler = async (e) => {
    e.preventDefault()

    dispatch(
      createAnecdote({
        content: e.target.anecdote.value,
        votes: 0,
      })
    )

    dispatch(
      displayNotification(`Added new "${e.target.anecdote.value}" anecdote`, 10)
    )

    e.target.anecdote.value = ''
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={submitHandler}>
        <div>
          <input name='anecdote' />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
