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
  }));
};

const create = (patient: INewWebPatient): IPatient => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const id: string = uuid();
  const p = {
    id,
    ...patient,
  };

  patientData.push(p);

  return p;
};

export default {
  getAll,
  create,
};
