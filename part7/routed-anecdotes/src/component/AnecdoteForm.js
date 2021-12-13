import React from 'react'
import { useHistory } from 'react-router-dom'
import useField from '../hooks'

const AnecdoteForm = (props) => {
  const history = useHistory()
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    })
    props.displayNotification(`A "${content.value}" created successfully`)
    history.push('/')
  }

  const resetForm = () => {
    content.reset()
    author.reset()
    info.reset()
  }
  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            {...(({ type, value, onChange }) => ({ type, value, onChange }))(
              content
            )}
          />
        </div>
        <div>
          author
          <input
            {...(({ type, value, onChange }) => ({ type, value, onChange }))(
              author
            )}
          />
        </div>
        <div>
          url for more info
          <input
            {...(({ type, value, onChange }) => ({ type, value, onChange }))(
              info
            )}
          />
        </div>
        <button>create</button>
        <button type='button' onClick={resetForm}>
          reset
        </button>
      </form>
    </div>
  )
}

export default AnecdoteForm
