import React from 'react'
import { ICourse } from '../types'
import Course from './Course'

interface ContentProps {
  courseParts: ICourse[]
}

const Content = (props: ContentProps): JSX.Element => {
  const { courseParts } = props
  return (
    <div>
      {courseParts.map((course) => (
        <Course key={course.name} course={course} />
      ))}
    </div>
  )
}

export default Content
