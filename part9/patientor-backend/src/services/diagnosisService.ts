import diagnosisData from '../data/diagnoses';
import { IDiagnoses } from '../types';

const getAll = (): IDiagnoses[] => {
  return diagnosisData;
};

export default {
  getAll,
};
