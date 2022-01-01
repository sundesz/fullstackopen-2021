import { RequestHandler } from 'express';
import patientService from '../services/patientService';
import { PatientField } from '../types';
import toNewWebPatient from '../utils';

const getAll: RequestHandler = (_req, res) => {
  res.json(patientService.getAll());
};

const getOne: RequestHandler = (req, res) => {
  try {
    const patient = patientService.getOne(req.params.id);
    if (patient) {
      res.json(patient);
    } else {
      res.status(404).json({ error: 'Patient not found' });
    }
  } catch (e: unknown) {
    let errMessage = 'Something went wrong';
    if (e instanceof Error) {
      errMessage += ` "${e.message}"`;
    }
    res.status(400).send(errMessage);
  }
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
  getOne,
  getAll,
  create,
};
