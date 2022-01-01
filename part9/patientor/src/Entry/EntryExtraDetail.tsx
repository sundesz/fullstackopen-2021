import axios from 'axios';
import React from 'react';
import { List } from 'semantic-ui-react';
import { apiBaseUrl } from '../constants';
import { setDiagnosisList, useStateValue } from '../state';
import { Diagnosis, Entry, EntryType } from '../types';

interface EntryDetailProps {
  entry: Entry;
}

const EntryExtraDetails = (props: EntryDetailProps): JSX.Element => {
  const [{ diagnosis }, dispatch] = useStateValue();
  React.useEffect(() => {
    const fetchDiagnosisList = async () => {
      try {
        const { data: diagnosisDataFromApi } = await axios.get<Diagnosis[]>(
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

  const HealthCheckRatingColor: string[] = [
    'green',
    'yellow',
    'brown',
    'green',
  ];

  switch (props.entry.type) {
    case EntryType.Hospital:
      return <></>;
    case EntryType.HealthCheck:
      return (
        <div>
          <br />

          <i
            className={`heart icon ${
              HealthCheckRatingColor[props.entry.healthCheckRating]
            }`}
          ></i>
        </div>
      );
    case EntryType.OccupationalHealthcare:
      return (
        <>
          <List bulleted>
            {props.entry.diagnosisCodes?.map((code) => (
              <List.Item key={code}>
                {code} {diagnosis[code]?.name}
              </List.Item>
            ))}
          </List>
        </>
      );
    default:
      return <></>;
  }
};

export default EntryExtraDetails;
