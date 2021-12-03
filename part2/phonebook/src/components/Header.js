import React from 'react'

const Header = ({ title, displayType }) => {
  return <div className={displayType}>{title}</div>
}

export default Header
