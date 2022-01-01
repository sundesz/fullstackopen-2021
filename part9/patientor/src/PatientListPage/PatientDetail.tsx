import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Header, Icon } from 'semantic-ui-react';
import { apiBaseUrl } from '../constants';
import { setPatientData, useStateValue } from '../state';
import { GenderIcon, Patient } from '../types';
import Entry from '../Entry';

const renderGenderIcon = (patient: Patient | null): JSX.Element => {
  if (!patient) {
    return <></>;
  }
  return <Icon name={GenderIcon[patient?.gender]} />;
};

const PatientDetail = (): JSX.Element => {
  const { id: patientId } = useParams<{ id: string }>();
  const [{ patient }, dispatch] = useStateValue();

  React.useEffect(() => {
    const fetchPatientDetail = async () => {
      try {
        const { data: patientInfoFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${patientId}`
        );
        dispatch(setPatientData(patientInfoFromApi));
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(err);
          dispatch(setPatientData(null));
        }
      }
    };

    if (!(patient && patient.id === patientId) && patientId) {
      void fetchPatientDetail();
    }
  }, []);

  if (!patientId) {
    return <>Patient not found</>;
  }
  return (
    <Container textAlign="justified">
      <Header as="h2">
        {patient?.name} {renderGenderIcon(patient)}
      </Header>

      <div>
        <div>ssn: {patient?.ssn}</div>
        <div>occupation: {patient?.occupation}</div>
      </div>

      <br />
      <Entry entries={patient?.entries} />
    </Container>
  );
};

export default PatientDetail;
