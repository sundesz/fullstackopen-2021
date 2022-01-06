import React from 'react';
import { Label, Segment } from 'semantic-ui-react';
import {
  Entry,
  EntryType,
  HealthCheckRating,
  HealthCheckRatingColor,
} from '../types';

interface EntryDetailProps {
  entry: Entry;
}

const EntryExtraDetails = ({ entry }: EntryDetailProps): JSX.Element => {
  switch (entry.type) {
    case EntryType.Hospital:
      return (
        <div>
          {entry.discharge &&
            Boolean(
              entry.discharge.date.length || entry.discharge.criteria.length
            ) && (
              <Segment padded>
                <Label attached="top">Discharge</Label>
                <div>Date: {entry.discharge.date}</div>
                <div>Criteria: {entry.discharge.criteria}</div>
              </Segment>
            )}
        </div>
      );
    case EntryType.HealthCheck:
      const healthCheckRating = HealthCheckRating[entry.healthCheckRating];

      return (
        <div>
          <i
            className={`heart icon ${HealthCheckRatingColor[healthCheckRating]}`}
            title={healthCheckRating}
          ></i>
        </div>
      );
    case EntryType.OccupationalHealthcare:
      return (
        <div>
          <div>Employer name: {entry.employerName}</div>
          {entry.sickLeave &&
            Boolean(
              entry.sickLeave.startDate.length || entry.sickLeave.endDate.length
            ) && (
              <Segment padded>
                <Label attached="top">Sick leave</Label>
                <div>Start: {entry.sickLeave?.startDate}</div>
                <div>End: {entry.sickLeave?.endDate}</div>
              </Segment>
            )}
        </div>
      );
  }
};

export default EntryExtraDetails;
