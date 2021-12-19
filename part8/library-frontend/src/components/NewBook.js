import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import useField from '../hooks'
import { ALL_BOOKS, CREATE_BOOK, ALL_AUTHORS } from '../queries'
import { inputAttributes } from '../utils'

const NewBook = () => {
  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
  })
  const history = useHistory()

  const title = useField('text', 'title')
  const author = useField('text', 'author')
  const published = useField('number', 'published')
  const genre = useField('text', 'genre')

  const [genres, setGenres] = useState([])

  const submit = async (event) => {
    event.preventDefault()

    createBook({
      variables: {
        title: title.value,
        author: author.value,
        published: Number(published.value),
        genres: genres,
      },
    }).catch((err) => console.log(err))

    history.push('/')

    title.reset()
    author.reset()
    published.reset()
    genre.reset()
    setGenres([])
  }

  const addGenre = () => {
    setGenres(genres.concat(genre.value))
    genre.reset()
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          Title
          <input {...inputAttributes(title)} />
        </div>
        <div>
          Author
          <input {...inputAttributes(author)} />
        </div>
        <div>
          Published
          <input {...inputAttributes(published)} />
        </div>
        <div>
          <input {...inputAttributes(genre)} />
          <button onClick={addGenre} type='button'>
            Add genre
          </button>
        </div>
        <div>Genres: {genres.join(' ')}</div>
        <button type='submit'>Create book</button>
      </form>
    </div>
  )
}

export default NewBook
