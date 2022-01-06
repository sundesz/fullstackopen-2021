import { State } from './state';
import { IDiagnosis, Entry, IPatient } from '../types';

export type Action =
  | { type: 'SET_PATIENT_LIST'; payload: IPatient[] }
  | { type: 'ADD_PATIENT'; payload: IPatient }
  | { type: 'SET_PATIENT'; payload: IPatient | null }
  | { type: 'SET_DIAGNOSES_LIST'; payload: IDiagnosis[] }
  | {
      type: 'ADD_ENTRY';
      payload: {
        id: string;
        newEntry: Entry;
      };
    };

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
    case 'ADD_ENTRY': {
      return {
        ...state,
        patient: state.patient
          ? {
              ...state.patient,
              entries: state.patient.entries
                ? [...state.patient.entries, action.payload.newEntry]
                : [],
            }
          : null,
      };
    }

    default:
      return state;
  }
};

export const setPatientData = (patientData: IPatient | null): Action => {
  return { type: 'SET_PATIENT', payload: patientData };
};

export const setPatientList = (patientList: IPatient[]): Action => {
  return { type: 'SET_PATIENT_LIST', payload: patientList };
};

export const createPatient = (patient: IPatient): Action => {
  return { type: 'ADD_PATIENT', payload: patient };
};

export const setDiagnosisList = (diagnosisList: IDiagnosis[]): Action => {
  return { type: 'SET_DIAGNOSES_LIST', payload: diagnosisList };
};

export const createEntry = (patientId: string, newEntry: Entry): Action => {
  return {
    type: 'ADD_ENTRY',
    payload: { id: patientId, newEntry: newEntry },
  };
};
