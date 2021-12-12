import React from 'react'
import { useSelector } from 'react-redux'
import Anecdote from './Anecdote'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state)

  const orderByVotes = (anecdote1, anecdote2) =>
    anecdote2.votes - anecdote1.votes

  return (
    <div>
      <h2>Anecdotes</h2>

      {anecdotes.sort(orderByVotes).map((anecdote) => (
        <Anecdote key={anecdote.id} anecdote={anecdote} />
      ))}
    </div>
  )
}

export default AnecdoteList
