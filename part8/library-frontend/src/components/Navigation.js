import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <div className='navigation'>
      <ul>
        <li>Library App</li>
        <li>
          <Link to={'/authors'}>Authors</Link>
        </li>
        <li>
          <Link to={'/books'}>Books</Link>
        </li>
        <li>
          <Link to={'/addbook'}>Add Book</Link>
        </li>
      </ul>
    </div>
  )
}

export default Navigation
