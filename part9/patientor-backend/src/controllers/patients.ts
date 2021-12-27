import { RequestHandler } from 'express';
import patientService from '../services/patientService';

const getAll: RequestHandler = (_req, res) => {
  res.json(patientService.getAll());
};

export default {
  getAll,
};
