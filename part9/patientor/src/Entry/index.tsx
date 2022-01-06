import axios from 'axios';
import React from 'react';
import { Button, Container, Header } from 'semantic-ui-react';
import { apiBaseUrl } from '../constants';
import { Entry, IDiagnosis, IEntryFormValues } from '../types';
import EntryDetail from './EntryDetail';
import { createEntry, setDiagnosisList, useStateValue } from '../state';
import AddEntryModal from '../AddEntryModal';

interface EntryProps {
  entries: Entry[] | undefined;
  patientId: string;
}

const index = ({ entries, patientId }: EntryProps): JSX.Element => {
  const [{ diagnosis }, dispatch] = useStateValue();
  const [open, setOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  React.useEffect(() => {
    const fetchDiagnosisList = async () => {
      try {
        const { data: diagnosisDataFromApi } = await axios.get<IDiagnosis[]>(
          `${apiBaseUrl}/diagnosis`
        );

        dispatch(setDiagnosisList(diagnosisDataFromApi));
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(error);
        }
      }
    };

    if (Object.entries(diagnosis).length === 0) {
      void fetchDiagnosisList();
    }
  }, []);

  const onClose = (): void => {
    setOpen(false);
    setError(undefined);
  };

  const onSubmitHandler = async (values: IEntryFormValues) => {
    try {
      const { data: EntryTypeFromApi } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patientId}/entries`,
        values
      );
      dispatch(createEntry(patientId, EntryTypeFromApi));

      setOpen(false);
      setError(undefined);
    } catch (error: unknown) {
      let errorMessage = 'Something went wrong.';

      if (axios.isAxiosError(error) && error.response) {
        // console.error(error.response.data);
        errorMessage = error.response.data as string;
      }
      // console.log(errorMessage);
      setError(errorMessage);
    }
  };

  return (
    <div>
      <Header as="h3">Entries</Header>

      <AddEntryModal
        modalOpen={open}
        onClose={onClose}
        onSubmit={onSubmitHandler}
        error={error}
      />
      <Button onClick={() => setOpen(true)}>Add New Entries</Button>

      <br />
      <br />

      <Container>
        {entries && entries.length ? (
          entries.map((entry) => <EntryDetail key={entry.id} entry={entry} />)
        ) : (
          <b>No entries found</b>
        )}
      </Container>
    </div>
  );
};

export default index;
