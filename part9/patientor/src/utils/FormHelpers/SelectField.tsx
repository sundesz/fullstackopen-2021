import React from 'react';
import { ErrorMessage, Field, FormikProps } from 'formik';
import { Dropdown, DropdownProps, Form } from 'semantic-ui-react';
import { IDiagnosis, EntryType, Gender, HealthCheckRating } from '../../types';

// structure of a single option
export type GenderOption = {
  value: Gender;
  label: string;
};

export type EntryTypeOption = {
  value: EntryType;
  label: string;
};

export type HealthCheckRatingOption = {
  value: HealthCheckRating;
  label: string;
};

interface GenericSelectProps<T> {
  name: string;
  label: string;
  options: T[];
  fieldDisplay?: { display: string };
}

// TODO: Make generic select
// export const GenericSelect = <T extends unknown>({
//   name,
//   label,
//   options,
//   fieldDisplay,
// }: GenericSelectProps<T>): JSX.Element => {
//   return (
//     <Form.Field style={fieldDisplay}>
//       <label>{label}</label>
//       <Field as="select" name={name} className="ui dropdown">
//         {options.map((option) => (
//           <option key={option.value} value={option.value}>
//             {option.label || option.value}
//           </option>
//         ))}
//       </Field>
//     </Form.Field>
//   );
// };

export const SelectField = ({
  name,
  label,
  options,
  fieldDisplay,
}: GenericSelectProps<GenderOption>) => (
  <Form.Field style={fieldDisplay}>
    <label>{label}</label>
    <Field as="select" name={name} className="ui dropdown">
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </Field>
  </Form.Field>
);

export const SelectHealthCheckRatingField = ({
  name,
  label,
  options,
  fieldDisplay,
}: GenericSelectProps<HealthCheckRatingOption>) => (
  <Form.Field style={fieldDisplay}>
    <label>{label}</label>
    <Field as="select" name={name} className="ui dropdown">
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </Field>
  </Form.Field>
);

export const SelectEntryField = ({
  name,
  label,
  options,
}: GenericSelectProps<EntryTypeOption>) => (
  <Form.Field>
    <label>{label}</label>
    <Field as="select" name={name} className="ui dropdown">
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </Field>
  </Form.Field>
);

export const DiagnosisSelection = ({
  diagnoses,
  setFieldValue,
  setFieldTouched,
}: {
  diagnoses: IDiagnosis[];
  setFieldValue: FormikProps<{ diagnosisCodes: string[] }>['setFieldValue'];
  setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>['setFieldTouched'];
}) => {
  const field = 'diagnosisCodes';
  const onChange = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    setFieldTouched(field, true);
    setFieldValue(field, data.value);
  };

  const stateOptions = diagnoses.map((diagnosis) => ({
    key: diagnosis.code,
    text: `${diagnosis.name} (${diagnosis.code})`,
    value: diagnosis.code,
  }));

  return (
    <Form.Field>
      <label>Diagnoses</label>
      <Dropdown
        fluid
        multiple
        search
        selection
        options={stateOptions}
        onChange={onChange}
      />
      <ErrorMessage name={field} />
    </Form.Field>
  );
};
