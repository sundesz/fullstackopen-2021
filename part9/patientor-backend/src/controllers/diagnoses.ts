import { RequestHandler } from 'express';
import diagnosisService from '../services/diagnosisService';

const getAll: RequestHandler = (_req, res) => {
  res.json(diagnosisService.getAll());
};

export default {
  getAll,
};
