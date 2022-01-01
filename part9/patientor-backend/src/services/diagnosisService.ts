import diagnosisData from '../data/diagnosis';
import { IDiagnosis } from '../types';

const getAll = (): IDiagnosis[] => {
  return diagnosisData;
};

export default {
  getAll,
};
