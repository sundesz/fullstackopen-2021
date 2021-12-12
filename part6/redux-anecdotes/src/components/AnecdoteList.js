import React from 'react'
import { useSelector } from 'react-redux'
import Anecdote from './Anecdote'

const AnecdoteList = () => {
  const appState = useSelector((state) => state)

  const orderByVotes = (anecdote1, anecdote2) =>
    anecdote2.votes - anecdote1.votes

  const anecdotes =
    appState.filter === ''
      ? appState.anecdotes
      : appState.anecdotes.filter((a) => a.content.includes(appState.filter))

  return (
    <div>
      {anecdotes.sort(orderByVotes).map((anecdote) => (
        <Anecdote key={anecdote.id} anecdote={anecdote} />
      ))}
    </div>
  )
}

export default AnecdoteList
