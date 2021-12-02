import React from 'react'

const Filter = ({ searchText, searchHandler }) => {
  return (
    <div>
      filter shown with <input value={searchText} onChange={searchHandler} />
    </div>
  )
}

export default Filter
