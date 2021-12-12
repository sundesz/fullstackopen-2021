import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { displayNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const submitHandler = async (e) => {
    e.preventDefault()

    props.createAnecdote({
      content: e.target.anecdote.value,
      votes: 0,
    })

    props.displayNotification(
      `Added new "${e.target.anecdote.value}" anecdote`,
      10
    )

    e.target.anecdote.value = ''
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={submitHandler}>
        <div>
          <input name='anecdote' />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  createAnecdote,
  displayNotification,
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)
