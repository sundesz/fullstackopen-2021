import React from 'react'
import Anecdote from './Anecdote'
import Header from './Header'

const MostVotedAnecdotes = ({ votes, anecdotes }) => {
  const getMostVotedAnecdotes = () => {
    const mostVotedAnecdotes = Math.max(...votes)
    return votes.indexOf(mostVotedAnecdotes)
  }

  if (votes.every((vote) => vote === 0)) {
    return null
  }

  return (
    <div>
      <Header title='Anecdote with most votes' />
      <Anecdote
        votes={votes}
        anecdotes={anecdotes}
        selected={getMostVotedAnecdotes()}
      />
    </div>
  )
}

export default MostVotedAnecdotes
