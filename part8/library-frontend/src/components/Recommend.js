import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import Alert from 'react-bootstrap/Alert'
import { ALL_BOOKS, FAVORITE_GENRE } from '../queries'

const Recommend = () => {
  const [filter, setFilter] = useState('')
  const books = useQuery(ALL_BOOKS)

  const userGenre = useQuery(FAVORITE_GENRE)

  useEffect(() => {
    if (userGenre.data) {
      setFilter(userGenre.data.favoriteGenreOfUser)
    }
  }, [userGenre.data])

  if (books.loading) {
    return <div>Loading ...</div>
  }

  if (books.error) {
    console.error(books.error)
    return null
  }

  const allBooks =
    filter === ''
      ? books.data.allBooks
      : books.data.allBooks.filter((book) => book.genres.includes(filter))

  return (
    <div>
      <h3>Books</h3>

      <Alert variant='secondary'>
        Books in your favorite genre{' '}
        <b>{filter === '' ? 'all genres' : filter}</b>
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
          {allBooks.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Recommend
