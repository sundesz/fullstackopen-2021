import React from 'react'
import { ICoursePart } from '../types'
import Part from './Part'

interface ContentProps {
  courseParts: ICoursePart[]
}

const Content = (props: ContentProps): JSX.Element => {
  const { courseParts } = props
  return (
    <div>
      {courseParts.map((course) => (
        <Part key={course.name} course={course} />
      ))}
    </div>
  )
}

export default Content
