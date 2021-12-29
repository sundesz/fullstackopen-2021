import React from 'react'
import { ICourse } from '../types'

interface CourseProps {
  course: ICourse
}

const Course = (props: CourseProps): JSX.Element => {
  const { course } = props
  return (
    <p>
      {course.name} {course.exerciseCount}
    </p>
  )
}

export default Course
