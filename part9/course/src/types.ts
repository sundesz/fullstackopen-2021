export enum CourseType {
  NORMAL = 'normal',
  PROJECT = 'groupProject',
  SUBMISSION = 'submission',
  SPECIAL = 'special',
}

interface ICourseBase {
  name: string
  exerciseCount: number
  type: string
}

interface ICourseWithDescription extends ICourseBase {
  description: string
}

export interface ICourseNormal extends ICourseWithDescription {
  type: 'normal'
}

export interface ICourseProject extends ICourseBase {
  type: 'groupProject'
  groupProjectCount: number
}

export interface ICourseSubmission extends ICourseWithDescription {
  type: 'submission'
  exerciseSubmissionLink: string
}

export interface ICourseSpecial extends ICourseWithDescription {
  type: 'special'
  requirements: string[]
}

export type ICoursePart =
  | ICourseNormal
  | ICourseProject
  | ICourseSubmission
  | ICourseSpecial
