import { Entry } from './entry';

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export enum GenderIcon {
  male = 'mars',
  female = 'venus',
  other = 'transgender',
}

export interface IPatient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries?: Entry[];
}

export type PatientFormValues = Omit<IPatient, 'id' | 'entries'>;
