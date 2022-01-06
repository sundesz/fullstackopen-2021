import { IDiagnosis } from './diagnosis';

export enum EntryIcon {
  Hospital = 'hospital symbol',
  OccupationalHealthcare = 'stethoscope',
  HealthCheck = 'doctor',
}

export enum HealthCheckRating {
  Healthy = 0,
  LowRisk = 1,
  HighRisk = 2,
  CriticalRisk = 3,
}

type RatingColor = {
  [key: string]: string;
};
export const HealthCheckRatingColor: RatingColor = {
  Healthy: 'green',
  LowRisk: 'yellow',
  HighRisk: 'brown',
  CriticalRisk: 'red',
};

export enum EntryType {
  Hospital = 'Hospital',
  OccupationalHealthcare = 'OccupationalHealthcare',
  HealthCheck = 'HealthCheck',
}

interface IBaseEntry {
  id: string;
  date: string;
  specialist: string;
  description: string;
  diagnosisCodes?: Array<IDiagnosis['code']>;
}

export interface IHospitalEntry extends IBaseEntry {
  type: EntryType.Hospital;
  discharge?: {
    date: string;
    criteria: string;
  };
}

export interface IOccupationalHealthcareEntry extends IBaseEntry {
  type: EntryType.OccupationalHealthcare;
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export interface IHealthCheckEntry extends IBaseEntry {
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
export type EntryWithoutId = UnionOmit<Entry, 'id'>;

export interface IEntryFormValues {
  type: EntryType;
  date: string;
  specialist: string;
  description: string;
  diagnosisCodes: Array<IDiagnosis['code']>;
  discharge: {
    date: string;
    criteria: string;
  };
  employerName: string;
  sickLeave: {
    startDate: string;
    endDate: string;
  };
  healthCheckRating: HealthCheckRating;
}
