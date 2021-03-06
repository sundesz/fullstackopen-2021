import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Anecdote from './Anecdote'
import { initializeAnecdotes } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const appState = useSelector((state) => state)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

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
