import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import {
  Field,
  Formik,
  Form,
  FieldInputProps,
  FormikProps,
  FieldProps,
} from 'formik';
import * as Yup from 'yup';

import {
  TextField,
  EntryTypeOption,
  SelectHealthCheckRatingField,
  HealthCheckRatingOption,
  DateField,
  DiagnosisSelection,
} from '../utils/FormHelpers';
import { EntryType, HealthCheckRating, IEntryFormValues } from '../types';
import { useStateValue } from '../state';

interface EntryFormProps {
  onSubmit: (values: IEntryFormValues) => void;
  onCancel: () => void;
}

export const entryTypeOptions: EntryTypeOption[] = [
  { value: EntryType.Hospital, label: 'Hospital' },
  { value: EntryType.HealthCheck, label: 'HealthCheck' },
  { value: EntryType.OccupationalHealthcare, label: 'OccupationalHealthcare' },
];

export const HealthCheckRatingOptions: HealthCheckRatingOption[] = [
  { value: HealthCheckRating.Healthy, label: 'Healthy' },
  { value: HealthCheckRating.LowRisk, label: 'Low risk' },
  { value: HealthCheckRating.HighRisk, label: 'High risk' },
  { value: HealthCheckRating.CriticalRisk, label: 'Critical risk' },
];

const INITIAL_VALUES: IEntryFormValues = {
  type: EntryType.HealthCheck,
  date: '',
  specialist: '',
  description: '',
  diagnosisCodes: [],
  discharge: {
    date: '',
    criteria: '',
  },
  employerName: '',
  sickLeave: {
    startDate: '',
    endDate: '',
  },
  healthCheckRating: 0,
};

const FORM_VALIDATION = Yup.object().shape({
  type: Yup.string().required('Field is required'),
  date: Yup.date().required('Field is required'),
  specialist: Yup.string().required('Field is required'),
  description: Yup.string().required('Field is required'),
  diagnosisCodes: Yup.array().of(Yup.string()),

  discharge: Yup.object().shape({
    date: Yup.date(),
    criteria: Yup.string(),
  }),
  // discharge: Yup.object().when('type', {
  //   is: (type: string) => type === EntryType.Hospital,
  //   then: Yup.object().shape({
  //     date: Yup.date().required('Field is required'),
  //     criteria: Yup.string().required('Field is required'),
  //   }),
  //   // Note: we can also use otherwise. This is optional in this case
  //   otherwise: Yup.object().shape({
  //     date: Yup.date(),
  //     criteria: Yup.string(),
  //   }),
  // }),

  employerName: Yup.string().when('type', {
    is: (type: string) => type === EntryType.OccupationalHealthcare,
    then: Yup.string().required('Field is required'),
  }),
  sickLeave: Yup.object().shape({
    startDate: Yup.date(),
    endDate: Yup.date().min(
      Yup.ref('startDate'),
      "Sick leave: End date can't be before Start date"
    ),
  }),
  healthCheckRating: Yup.number().when('type', {
    is: (type: string) => type === EntryType.HealthCheck,
    then: Yup.number().required('Field is required'),
  }),
});

export const AddEntryForm = ({ onSubmit, onCancel }: EntryFormProps) => {
  const [{ diagnosis }] = useStateValue();
  const [displayHospital, setDisplayHospital] = React.useState<string>('none');
  const [displayHealthCheck, setDisplayHealthCheck] =
    React.useState<string>('');
  const [displayOccupationalHealthcare, setDisplayOccupationalHealthcare] =
    React.useState<string>('none');

  const onChangeType = (
    e: React.ChangeEvent<HTMLSelectElement>,
    field: FieldInputProps<HTMLSelectElement>
  ) => {
    const type = e.target.value;
    switch (type) {
      case 'Hospital':
        setDisplayHospital('');
        setDisplayHealthCheck('none');
        setDisplayOccupationalHealthcare('none');

        break;
      case 'HealthCheck':
        setDisplayHospital('none');
        setDisplayHealthCheck('');
        setDisplayOccupationalHealthcare('none');
        break;
      case 'OccupationalHealthcare':
        setDisplayHospital('none');
        setDisplayHealthCheck('none');
        setDisplayOccupationalHealthcare('');
        break;
    }
    field.onChange(e);
  };

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      onSubmit={onSubmit}
      validationSchema={FORM_VALIDATION}
    >
      {({
        dirty,
        isValid,
        setFieldValue,
        setFieldTouched,
      }: FormikProps<IEntryFormValues>) => {
        return (
          <Form className="form ui">
            <Field name="entryType">
              {({ field }: FieldProps) => (
                <div className="field">
                  <label>Type</label>
                  <Field
                    as="select"
                    name="type"
                    className="ui dropdown"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      onChangeType(e, field)
                    }
                  >
                    {entryTypeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label || option.value}
                      </option>
                    ))}
                  </Field>
                </div>
              )}
            </Field>

            <Field label="Date" name="date" component={DateField} />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="description"
              name="description"
              component={TextField}
            />
            <DiagnosisSelection
              diagnoses={Object.values(diagnosis)}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />

            <Field
              label="Discharge date"
              name="discharge.date"
              fieldDisplay={{ display: displayHospital }}
              component={DateField}
            />
            <Field
              label="Discharge criteria"
              placeholder="Discharge criteria"
              name="discharge.criteria"
              fieldDisplay={{ display: displayHospital }}
              component={TextField}
            />
            <Field
              label="Employer name"
              placeholder="Employer name"
              name="employerName"
              fieldDisplay={{ display: displayOccupationalHealthcare }}
              component={TextField}
            />
            <Field
              label="Sick leave start date"
              name="sickLeave.startDate"
              fieldDisplay={{ display: displayOccupationalHealthcare }}
              component={DateField}
            />
            <Field
              label="Sick leave end date"
              name="sickLeave.endDate"
              fieldDisplay={{ display: displayOccupationalHealthcare }}
              component={DateField}
            />

            <SelectHealthCheckRatingField
              label="Health check rating"
              name="healthCheckRating"
              options={HealthCheckRatingOptions}
              fieldDisplay={{ display: displayHealthCheck }}
            />

            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
