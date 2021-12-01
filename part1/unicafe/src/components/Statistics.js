import React from 'react'
import StatisticLine from './StatisticLine'

const Statistics = ({ good, neutral, bad }) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return <div>No feedback given</div>
  }

  const total = good + neutral + bad
  const average = (good * 1 + neutral * 0 + bad * -1) / total
  const positive = (good / total) * 100

  return (
    <table>
      <tbody>
        <StatisticLine name='good' value={good} />
        <StatisticLine name='neutral' value={neutral} />
        <StatisticLine name='bad' value={bad} />
        <StatisticLine name='all' value={total} />
        <StatisticLine name='average' value={average} />
        <StatisticLine name='positive' value={`${positive} %`} />
      </tbody>
    </table>
  )
}

export default Statistics
