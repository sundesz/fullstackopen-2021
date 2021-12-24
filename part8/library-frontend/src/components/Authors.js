import { useQuery } from '@apollo/client'
import React from 'react'
import Table from 'react-bootstrap/Table'
import { ALL_AUTHORS } from '../queries'
import SetBirthdate from './SetBirthdate'

const Authors = ({ token, displayNotification }) => {
  const authors = useQuery(ALL_AUTHORS)

  if (authors.loading) {
    return <div>Loading...</div>
  }

  if (authors.error) {
    console.error(authors.error)
    return <div>{authors.error}</div>
  }

  return (
    <div>
      <h3>Authors</h3>

      <Table striped hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Birthyear</th>
            <th>Books</th>
          </tr>
        </thead>
        <tbody>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <br />

      {token && (
        <SetBirthdate
          authors={authors.data.allAuthors}
          displayNotification={displayNotification}
        />
      )}
    </div>
  )
}

export default Authors
