import {
  EntryField,
  EntryType,
  Gender,
  HealthCheckRating,
  IDiagnosis,
  IEntryDischarge,
  IEntrySickLeave,
  NewWebPatient,
  NewEntry,
  NewEntryBase,
  PatientField,
} from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: unknown): gender is Gender => {
  const g = gender as Gender;
  return Object.values(Gender).includes(g);
};

const isStringArray = (codes: unknown[]): codes is string[] => {
  return Array.isArray(codes) && codes.every((code) => isString(code));
};

const isEntryType = (type: unknown): type is EntryType => {
  const t = type as EntryType;
  return Object.values(EntryType).includes(t);
};

const isHealthCheckRating = (rating: unknown): rating is HealthCheckRating => {
  const r: unknown[] = Object.values(HealthCheckRating);
  return r.includes(Number(rating));
};

const isDischarge = (discharge: unknown): discharge is IEntryDischarge => {
  const d = discharge as IEntryDischarge;
  return (
    d.date !== undefined &&
    d.criteria !== undefined &&
    isDate(d.date) &&
    isString(d.criteria)
  );
};

const isSickLeave = (sickLeave: unknown): sickLeave is IEntrySickLeave => {
  const s = sickLeave as IEntrySickLeave;
  return (
    s.startDate !== undefined &&
    s.endDate !== undefined &&
    isDate(s.startDate) &&
    isDate(s.endDate)
  );
};

const parseSickLeave = (sickLeave: unknown): IEntrySickLeave => {
  if (!sickLeave || !isSickLeave(sickLeave)) {
    throw new Error('Invalid or missing Sick leave');
  }

  return {
    startDate: parseDate(sickLeave.startDate),
    endDate: parseDate(sickLeave.endDate),
  };
};

const parseDischarge = (discharge: unknown): IEntryDischarge => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error('Invalid or missing discharge');
  }

  return {
    date: parseDate(discharge.date),
    criteria: parseString(discharge.criteria, 'Discharge criteria'),
  };
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (rating === undefined || !isHealthCheckRating(rating)) {
    throw new Error(`Invalid or missing HealthCheckRating: ${rating}`);
  }

  return rating;
};

const parseEntryType = (type: unknown): EntryType => {
  if (!type || !isEntryType(type)) {
    throw new Error(`Invalid or missing EntryType: ${type}`);
  }

  return type;
};

const parseDiagnosisCodes = (
  codes: unknown[] | undefined
): Array<IDiagnosis['code']> | undefined => {
  if (!codes) {
    return undefined;
  }
  if (!isStringArray(codes)) {
    throw new Error(`Invalid or missing Diagnosis code: ${codes}`);
  }
  return codes;
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
}: PatientField): NewWebPatient => {
  return {
    name: parseString(name, 'name'),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseString(ssn, 'ssn'),
    gender: parseGender(gender),
    occupation: parseString(occupation, 'occupation'),
  };
};

export const toNewEntry = ({
  type,
  date,
  specialist,
  description,
  diagnosisCodes,
  healthCheckRating,
  employerName,
  sickLeave,
  discharge,
}: EntryField): NewEntry => {
  const validEntryType = parseEntryType(type);

  const entry: NewEntryBase = {
    date: parseDate(date),
    description: parseString(description, 'description'),
    specialist: parseString(specialist, 'specialist'),
  };

  if (diagnosisCodes) {
    entry.diagnosisCodes = parseDiagnosisCodes(diagnosisCodes);
  }

  switch (validEntryType) {
    case EntryType.Hospital: {
      const hospital: NewEntry = {
        ...entry,
        type: validEntryType,
      };

      if (discharge) {
        hospital.discharge = parseDischarge(discharge);
      }

      return hospital;
    }
    case EntryType.HealthCheck:
      return {
        ...entry,
        type: validEntryType,
        healthCheckRating: parseHealthCheckRating(healthCheckRating),
      };

    case EntryType.OccupationalHealthcare: {
      const occupationalHealthcare: NewEntry = {
        ...entry,
        type: validEntryType,
        employerName: parseString(employerName, 'Employer name'),
      };

      if (sickLeave) {
        occupationalHealthcare.sickLeave = parseSickLeave(sickLeave);
      }
      return occupationalHealthcare;
    }
  }
};

export default toNewWebPatient;
