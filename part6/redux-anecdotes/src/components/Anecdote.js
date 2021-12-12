import React from 'react'
import { useDispatch } from 'react-redux'
import { castVote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(castVote(id))
  }

  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
  )
}

export default Anecdote
