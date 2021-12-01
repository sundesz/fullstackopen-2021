import React from 'react'

const Header = ({ title, headerType = 'h1' }) => {
  return headerType === 'h1' ? <h1>{title}</h1> : <h2>{title}</h2>
}

export default Header
