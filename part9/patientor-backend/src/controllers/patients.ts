import { RequestHandler } from 'express';
import patientService from '../services/patientService';
import { PatientField } from '../types';
import toNewWebPatient from '../utils';

const getAll: RequestHandler = (_req, res) => {
  res.json(patientService.getAll());
};

const create: RequestHandler = (req, res) => {
  try {
    const newPatientData = toNewWebPatient(req.body as PatientField);
    res.json(patientService.create(newPatientData));
  } catch (e: unknown) {
    let errMessage = 'Something went wrong';
    if (e instanceof Error) {
      errMessage += ` "${e.message}"`;
    }
    res.status(400).send(errMessage);
  }
};

export default {
  getAll,
  create,
};
