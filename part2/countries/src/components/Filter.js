import React from 'react'

const Filter = ({ searchText, handleSearch }) => {
  return (
    <div>
      Find countries <input value={searchText} onChange={handleSearch} />
    </div>
  )
}

export default Filter
