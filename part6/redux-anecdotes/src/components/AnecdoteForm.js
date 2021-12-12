import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { displayNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const submitHandler = async (e) => {
    e.preventDefault()

    const savedAnecdote = await anecdoteService.create({
      content: e.target.anecdote.value,
      votes: 0,
    })

    dispatch(createAnecdote(savedAnecdote))

    displayNotification(
      dispatch,
      `Added new "${e.target.anecdote.value}" anecdote`
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
