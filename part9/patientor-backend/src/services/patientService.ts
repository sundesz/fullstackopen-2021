import { v4 as uuid } from 'uuid';
import patientData from '../data/patients';
import { INewWebPatient, IPatient, IWebPatient } from '../types';

const getAll = (): IWebPatient[] => {
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

const create = (patient: INewWebPatient): IPatient => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const id: string = uuid();
  const p = {
    id,
    ...patient,
    entries: patient.entries ?? [],
  };

  patientData.push(p);

  return p;
};

export default {
  getOne,
  getAll,
  create,
};
