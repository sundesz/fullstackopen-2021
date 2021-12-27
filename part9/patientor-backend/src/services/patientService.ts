import patientData from '../data/patients';
import { IWebPatient } from '../types';

const getAll = (): IWebPatient[] => {
  return patientData.map((patient) => ({
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
  }));
};

export default {
  getAll,
};
