import React from 'react';
import { Grid, Header, List, Segment } from 'semantic-ui-react';
import { useStateValue } from '../state';
import { Entry, EntryIcon } from '../types';
import EntryExtraDetails from './EntryExtraDetail';

interface EntryDetailProps {
  entry: Entry;
}

const EntryDetail = ({ entry }: EntryDetailProps): JSX.Element => {
  const [{ diagnosis }] = useStateValue();

  return (
    <div>
      <Grid>
        <Grid.Column>
          <Segment raised>
            <Header as="h3">
              {entry.date}{' '}
              <i
                className={`${EntryIcon[entry.type]} icon`}
                title={entry.type}
              ></i>
            </Header>
            <i>{entry.description}</i>
            <div>Specialist: {entry.specialist}</div>
            {entry.diagnosisCodes && (
              <List bulleted>
                {entry.diagnosisCodes?.map((code) => (
                  <List.Item key={code}>
                    {code} {diagnosis[code]?.name}
                  </List.Item>
                ))}
              </List>
            )}

            <EntryExtraDetails entry={entry} />
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default EntryDetail;
