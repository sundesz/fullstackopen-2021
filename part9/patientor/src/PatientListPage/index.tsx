import React from 'react';
import axios from 'axios';
import { Container, Table, Button } from 'semantic-ui-react';

import AddPatientModal from '../AddPatientModal';
import { IPatient, PatientFormValues } from '../types';
import { apiBaseUrl } from '../constants';
import HealthRatingBar from '../components/HealthRatingBar';
import { createPatient, useStateValue } from '../state';
import { Link } from 'react-router-dom';

const PatientListPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewPatient = async (values: PatientFormValues) => {
    try {
      const { data: newPatient } = await axios.post<IPatient>(
        `${apiBaseUrl}/patients`,
        values
      );
      dispatch(createPatient(newPatient));
      closeModal();
    } catch (error: unknown) {
      let errorMessage = 'Something went wrong.';
      if (axios.isAxiosError(error) && error.response) {
        // console.error(error.response.data);
        errorMessage = error.response.data as string;
      }

      setError(errorMessage);
    }
  };

  return (
    <div className="App">
      <Container textAlign="center">
        <h3>Patient list</h3>
      </Container>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Gender</Table.HeaderCell>
            <Table.HeaderCell>Occupation</Table.HeaderCell>
            <Table.HeaderCell>Health Rating</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Object.values(patients).map((patient: IPatient) => (
            <Table.Row key={patient.id}>
              <Table.Cell>
                <Link to={`/patients/${patient.id}`}>{patient.name}</Link>
              </Table.Cell>
              <Table.Cell>{patient.gender}</Table.Cell>
              <Table.Cell>{patient.occupation}</Table.Cell>
              <Table.Cell>
                <HealthRatingBar showText={false} rating={1} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <AddPatientModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatient}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Patient</Button>
    </div>
  );
};

export default PatientListPage;
