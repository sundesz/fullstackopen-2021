import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import { Entry } from '../types';
import EntryDetail from './EntryDetail';

interface EntryProps {
  entries: Entry[] | undefined;
}

const index = ({ entries }: EntryProps): JSX.Element => {
  return (
    <div>
      <Header as="h3">entries</Header>
      <Container>
        {entries && entries.length ? (
          entries.map((entry) => <EntryDetail key={entry.id} entry={entry} />)
        ) : (
          <div>No entries found</div>
        )}
      </Container>
    </div>
  );
};

export default index;
