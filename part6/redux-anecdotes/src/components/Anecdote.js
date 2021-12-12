import React from 'react'
import { useDispatch } from 'react-redux'
import { castVote } from '../reducers/anecdoteReducer'
import { displayNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch()

  const vote = async (anecdote) => {
    dispatch(
      castVote(anecdote.id, {
        content: anecdote.content,
        votes: Number(anecdote.votes) + 1,
      })
    )
    dispatch(displayNotification(`You voted "${anecdote.content}"`, 10))
  }

  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </div>
  )
}

export default Anecdote
