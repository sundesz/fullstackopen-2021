import React from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import { Entry, EntryIcon } from '../types';
import EntryExtraDetails from './EntryExtraDetail';

interface EntryDetailProps {
  entry: Entry;
}

const EntryDetail = ({ entry }: EntryDetailProps): JSX.Element => {
  return (
    <div>
      <Grid>
        <Grid.Column>
          <Segment raised>
            <Header as="h3">
              {entry.date} <i className={`${EntryIcon[entry.type]} icon`}></i>
            </Header>
            <i>{entry.description}</i>
            <EntryExtraDetails entry={entry} />
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default EntryDetail;
