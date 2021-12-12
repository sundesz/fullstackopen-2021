import React from 'react'
import { Redirect } from 'react-router-dom'

const Anecdote = ({ anecdote }) => {
  if (anecdote === undefined) {
    return <Redirect to='/' />
  }
  return (
    <div>
      <h2>
        {anecdote.content} by {anecdote.author}
      </h2>
      <p>has {anecdote.votes} votes</p>
      <p>
        for more info see <a href={anecdote.info}>{anecdote.info}</a>
      </p>
    </div>
  )
}

export default Anecdote
