import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote, getId } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(
      createAnecdote({
        content: e.target.anecdote.value,
        id: getId(),
        votes: 0,
      })
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