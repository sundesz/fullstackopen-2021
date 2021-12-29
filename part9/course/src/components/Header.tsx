import React from 'react'

interface HeaderProps {
  title: string
}

const Header = (props: HeaderProps): JSX.Element => {
  return <h1>{props.title}</h1>
}

export default Header
