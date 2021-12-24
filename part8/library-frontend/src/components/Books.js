import { useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import { ALL_GENRES } from '../queries'

const Books = ({ filter, setFilter, getBooks, bookResult }) => {
  const genres = useQuery(ALL_GENRES)

  useEffect(() => {
    getBooks({ variables: { genre: filter } })
  }, [getBooks, filter])

  if (bookResult.loading || genres.loading) {
    return <div>Loading ...</div>
  }

  if (bookResult.error) {
    console.error(bookResult.error)
    return <div>Error loading books</div>
  }

  if (genres.error) {
    console.error(genres.error)
    return <div>Error loading genres</div>
  }

  const genresHandler = (genre) => () => {
    setFilter((value) => (genre === 'all genres' ? '' : genre))
  }

  const allGenres = [...genres.data.allGenres, 'all genres']
  const allBooks = bookResult.data?.allBooks

  return (
    <div>
      <h3>Books</h3>

      <Alert variant='secondary'>
        In genre: <b>{filter === '' ? 'all genres' : filter}</b>
      </Alert>

      <Table striped hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
        </thead>
        <tbody>
          {allBooks?.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <br />

      <ButtonGroup>
        {allGenres.map((genre) => (
          <Button
            variant='secondary'
            key={genre}
            onClick={genresHandler(genre)}
          >
            {genre}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  )
}

export default Books
