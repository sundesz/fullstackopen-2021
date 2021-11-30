import React from 'react'
import Header from './Header'
import Info from './Info'

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const average = (good * 1 + neutral * 0 + bad * -1) / total
  const positive = (good / total) * 100

  return (
    <>
      <Header title='statistics' />
      <Info name='good' value={good} />
      <Info name='neutral' value={neutral} />
      <Info name='bad' value={bad} />
      <Info name='all' value={total} />
      <Info name='average' value={average} />
      <Info name='positive' value={`${positive} %`} />
    </>
  )
}

export default Statistics
