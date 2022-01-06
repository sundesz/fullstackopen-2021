import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Header, Icon } from 'semantic-ui-react';
import { apiBaseUrl } from '../constants';
import { setPatientData, useStateValue } from '../state';
import { GenderIcon, IPatient } from '../types';
import Entry from '../Entry';

const renderGenderIcon = (patient: IPatient | null): JSX.Element => {
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
        const { data: patientInfoFromApi } = await axios.get<IPatient>(
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
        <div>SSN: {patient?.ssn}</div>
        <div>Occupation: {patient?.occupation}</div>
      </div>

      <br />
      <Entry entries={patient?.entries} patientId={patientId} />
    </Container>
  );
};

export default PatientDetail;
