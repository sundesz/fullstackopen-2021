import { v4 as uuid } from 'uuid';
import patientData from '../data/patients';
import { Entry, NewWebPatient, IPatient, WebPatient, NewEntry } from '../types';

const getAll = (): WebPatient[] => {
  return patientData.map((patient) => ({
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
    entries: patient.entries,
  }));
};

const getOne = (id: string): IPatient | undefined => {
  return patientData.find((patient) => patient.id === id);
};

const create = (patient: NewWebPatient): IPatient => {
  const id: string = uuid();
  const p = {
    id,
    ...patient,
    entries: patient.entries ?? [],
  };

  patientData.push(p);

  return p;
};

const getEntries = (id: string): Entry[] | undefined => {
  const patient: IPatient | undefined = getOne(id);
  return patient?.entries;
};

const createEntry = (id: string, entry: NewEntry): Entry | undefined => {
  const patient: IPatient | undefined = getOne(id);
  if (patient) {
    const newEntry: Entry = {
      id: uuid(),
      ...entry,
    };

    patient.entries?.push(newEntry);

    return newEntry;
  }
  return undefined;
};

export default {
  getOne,
  getAll,
  create,
  getEntries,
  createEntry,
};
