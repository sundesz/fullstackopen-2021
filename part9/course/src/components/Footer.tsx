import React from 'react'
import { ICoursePart } from '../types'

interface FooterProps {
  courseParts: ICoursePart[]
}

const Footer = (props: FooterProps): JSX.Element => {
  return (
    <>
      <p>
        Number of exercises{' '}
        {props.courseParts.reduce(
          (carry, part) => carry + part.exerciseCount,
          0
        )}
      </p>
    </>
  )
}

export default Footer
