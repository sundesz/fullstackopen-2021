import React from 'react'
import Header from './Header'
import Info from './Info'

const Statistics = ({ good, neutral, bad }) => {
  return (
    <>
      <Header title='statistics' />
      <Info name='good' value={good} />
      <Info name='neutral' value={neutral} />
      <Info name='bad' value={bad} />
    </>
  )
}

export default Statistics
