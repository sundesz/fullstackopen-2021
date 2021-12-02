import React from 'react'

const Header = ({ title, headerTag = 'h2' }) => {
  return headerTag === 'h2' ? <h2>{title}</h2> : <h3>{title}</h3>
}

export default Header
