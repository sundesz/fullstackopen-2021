import React from 'react'
import Helper from '../utils'
import {
  CourseType,
  ICourseNormal,
  ICoursePart,
  ICourseProject,
  ICourseSpecial,
  ICourseSubmission,
} from '../types'

interface CourseProps {
  course: ICoursePart
}

const Title = (course: {
  name: string
  exerciseCount: number
}): JSX.Element => {
  return (
    <div className='title'>
      {course.name} {course.exerciseCount}
    </div>
  )
}

const Description = (course: { description: string }): JSX.Element => {
  return <div className='description'>{course.description}</div>
}

const renderNormal = (course: ICourseNormal): JSX.Element => {
  return (
    <div className='course'>
      <Title name={course.name} exerciseCount={course.exerciseCount} />
      <Description description={course.description} />
    </div>
  )
}

const renderProject = (course: ICourseProject): JSX.Element => {
  return (
    <div className='course'>
      <Title name={course.name} exerciseCount={course.exerciseCount} />
      <div>project exercise {course.groupProjectCount}</div>
    </div>
  )
}

const renderSubmission = (course: ICourseSubmission): JSX.Element => {
  return (
    <div className='course'>
      <Title name={course.name} exerciseCount={course.exerciseCount} />
      <Description description={course.description} />
      <div>submit to {course.exerciseSubmissionLink}</div>
    </div>
  )
}

const renderSpecial = (course: ICourseSpecial): JSX.Element => {
  return (
    <div className='course'>
      <Title name={course.name} exerciseCount={course.exerciseCount} />
      <Description description={course.description} />
      <div>required skills: {course.requirements.join(', ')}</div>
    </div>
  )
}

const Part = ({ course }: CourseProps): JSX.Element => {
  switch (course.type) {
    case CourseType.NORMAL:
      return renderNormal(course)
    case CourseType.PROJECT:
      return renderProject(course)
    case CourseType.SUBMISSION:
      return renderSubmission(course)
    case CourseType.SPECIAL:
      return renderSpecial(course)
    default:
      return Helper.assertNever(course as never)
  }
}

export default Part
