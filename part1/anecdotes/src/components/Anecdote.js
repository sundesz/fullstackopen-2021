import React from 'react'

const Anecdote = ({ votes, anecdotes, selected }) => {
  return (
    <div>
      <div>{anecdotes[selected]}</div>
      <div>{`has ${votes[selected] || 0} votes`}</div>
    </div>
  )
}

export default Anecdote
