import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Anecdote from './Anecdote'
import anecdoteService from '../services/anecdotes'
import { initializeAnecdotes } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const appState = useSelector((state) => state)
  const dispatch = useDispatch()
  useEffect(() => {
    const fetch = async () => {
      const anecdote = await anecdoteService.getAll()
      dispatch(initializeAnecdotes(anecdote))
    }
    fetch()
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
