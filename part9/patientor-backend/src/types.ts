export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export interface IDiagnoses {
  code: string;
  name: string;
  latin?: string;
}

export interface IPatient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type IWebPatient = Omit<IPatient, 'ssn'>;

export type INewWebPatient = Omit<IPatient, 'id'>;

export type PatientField = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
};
