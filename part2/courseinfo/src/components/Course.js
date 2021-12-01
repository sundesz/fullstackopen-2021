import React from 'react'
import Content from './Content'
import Header from './Header'
import Total from './Total'

const Course = ({ course }) => {
  return (
    <div>
      <Header title={course.name} headerType='h2' />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course
