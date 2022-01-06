export enum Gender {
  Male = 'male',
  Female = 'female',
}

export enum EntryType {
  Hospital = 'Hospital',
  OccupationalHealthcare = 'OccupationalHealthcare',
  HealthCheck = 'HealthCheck',
}
export interface IDiagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum HealthCheckRating {
  Healthy = 0,
  LowRisk = 1,
  HighRisk = 2,
  CriticalRisk = 3,
}
export interface IPatient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries?: Entry[];
}

export type WebPatient = Omit<IPatient, 'ssn' | 'entries'>;

export type NewWebPatient = Omit<IPatient, 'id'>;

export type PatientField = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
  entries?: unknown;
};

export interface EntryField {
  type: unknown;
  date: unknown;
  specialist: unknown;
  description: unknown;
  diagnosisCodes?: unknown[];
  healthCheckRating?: unknown;
  employerName?: unknown;
  sickLeave?: unknown;
  discharge?: unknown;
}

interface IBaseEntry {
  id: string;
  date: string;
  specialist: string;
  description: string;
  diagnosisCodes?: Array<IDiagnosis['code']>;
}

export interface IEntryDischarge {
  date: string;
  criteria: string;
}

export interface IEntrySickLeave {
  startDate: string;
  endDate: string;
}

export interface IHospitalEntry extends IBaseEntry {
  type: EntryType.Hospital;
  discharge?: IEntryDischarge;
}

interface IOccupationalHealthcareEntry extends IBaseEntry {
  type: EntryType.OccupationalHealthcare;
  employerName: string;
  sickLeave?: IEntrySickLeave;
}

interface IHealthCheckEntry extends IBaseEntry {
  type: EntryType.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

export type Entry =
  | IHealthCheckEntry
  | IOccupationalHealthcareEntry
  | IHospitalEntry;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;
// Define Entry without the 'id' property
export type NewEntry = UnionOmit<Entry, 'id'>;

export type NewEntryBase = Omit<IBaseEntry, 'id'>;
