import React from 'react'
import { useDispatch } from 'react-redux'
import { castVote } from '../reducers/anecdoteReducer'
import { displayNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(castVote(id))
    displayNotification(dispatch, `Vote anecdote`)
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
