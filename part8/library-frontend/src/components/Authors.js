import { useQuery } from '@apollo/client'
import React from 'react'
import { ALL_AUTHORS } from '../queries'
import SetBirthdate from './SetBirthdate'

const Authors = ({ displayNotification }) => {
  const authors = useQuery(ALL_AUTHORS)

  if (authors.loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      <SetBirthdate
        authors={authors.data.allAuthors}
        displayNotification={displayNotification}
      />
    </div>
  )
}

export default Authors
