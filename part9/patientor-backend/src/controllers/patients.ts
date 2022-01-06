import { Response, RequestHandler } from 'express';
import patientService from '../services/patientService';
import { EntryField, PatientField } from '../types';
import toNewWebPatient, { toNewEntry } from '../utils';

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
  } catch (error: unknown) {
    catchError(res, error);
  }
};

const getEntries: RequestHandler = (req, res) => {
  try {
    const entries = patientService.getEntries(req.params.id);
    if (entries) {
      res.json(entries);
    } else {
      res.status(404).json({ error: 'Patient not found' });
    }
  } catch (error: unknown) {
    catchError(res, error);
  }
};

const create: RequestHandler = (req, res) => {
  try {
    const newPatientData = toNewWebPatient(req.body as PatientField);
    res.json(patientService.create(newPatientData));
  } catch (error: unknown) {
    catchError(res, error);
  }
};

const createEntry: RequestHandler = (req, res) => {
  try {
    const newEntry = toNewEntry(req.body as EntryField);
    res.json(patientService.createEntry(req.params.id, newEntry));
  } catch (error: unknown) {
    catchError(res, error);
  }
};

const catchError = (res: Response, error: unknown) => {
  let errMessage = 'Something went wrong';
  if (error instanceof Error) {
    errMessage += ` "${error.message}"`;
  }
  res.status(400).send(errMessage);
};

export default {
  getOne,
  getAll,
  getEntries,
  create,
  createEntry,
};
