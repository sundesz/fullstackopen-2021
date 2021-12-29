import React from 'react'
import Content from './components/Content'
import Footer from './components/Footer'
import Header from './components/Header'

const App = () => {
  const courseName = 'Half Stack application development'
  const courseParts = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
    },
  ]

  return (
    <div>
      <Header title={courseName} />
      <Content courseParts={courseParts} />
      <Footer courseParts={courseParts} />
    </div>
  )
}

export default App
