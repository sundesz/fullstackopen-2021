import React, { useState } from 'react'
import Header from './components/Header'
import Button from './components/Button'
import Statistics from './components/Statistics'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(() => good + 1)
  const handleNeutral = () => setNeutral(() => neutral + 1)
  const handleBad = () => setBad(() => bad + 1)

  return (
    <>
      <Header title='give feedback' />

      <div>
        <Button name='good' onClick={handleGood} />
        <Button name='neutral' onClick={handleNeutral} />
        <Button name='bad' onClick={handleBad} />
      </div>

      <Header title='statistics' />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App
