import { State } from './state';
import { Diagnosis, Patient } from '../types';

export type Action =
  | { type: 'SET_PATIENT_LIST'; payload: Patient[] }
  | { type: 'ADD_PATIENT'; payload: Patient }
  | { type: 'SET_PATIENT'; payload: Patient | null }
  | { type: 'SET_DIAGNOSES_LIST'; payload: Diagnosis[] };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case 'SET_PATIENT':
      return {
        ...state,
        patient: action.payload,
      };
    case 'SET_DIAGNOSES_LIST':
      return {
        ...state,
        diagnosis: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnosis,
        },
      };
    default:
      return state;
  }
};

export const setPatientData = (patientData: Patient | null): Action => {
  return { type: 'SET_PATIENT', payload: patientData };
};

export const setPatientList = (patientList: Patient[]): Action => {
  return { type: 'SET_PATIENT_LIST', payload: patientList };
};

export const createPatient = (patient: Patient): Action => {
  return { type: 'ADD_PATIENT', payload: patient };
};

export const setDiagnosisList = (diagnosisList: Diagnosis[]): Action => {
  return { type: 'SET_DIAGNOSES_LIST', payload: diagnosisList };
};
