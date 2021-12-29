import { Gender, INewWebPatient, PatientField } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: unknown): gender is Gender => {
  const g: unknown[] = Object.values(Gender);
  return g.includes(gender);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Invalid or missing gender: ${gender}`);
  }
  return gender;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Invalid or missing date: ' + date);
  }

  return date;
};

const parseString = (field: unknown, fieldName: string): string => {
  if (!field || !isString(field)) {
    throw new Error(`Invalid or missing ${fieldName}: ${field}`);
  }
  return field;
};

const toNewWebPatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: PatientField): INewWebPatient => {
  return {
    name: parseString(name, 'name'),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseString(ssn, 'ssn'),
    gender: parseGender(gender),
    occupation: parseString(occupation, 'occupation'),
  };
};

export default toNewWebPatient;
