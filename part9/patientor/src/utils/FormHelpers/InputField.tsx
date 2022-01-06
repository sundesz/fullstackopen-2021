import React from 'react';
import { ErrorMessage, Field, FieldProps } from 'formik';
import { Form } from 'semantic-ui-react';

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
  fieldDisplay?: string;
}

export const TextField = ({
  field,
  label,
  placeholder,
  fieldDisplay,
}: TextProps) => (
  <Form.Field style={fieldDisplay}>
    <label>{label}</label>
    <Field placeholder={placeholder} {...field} />
    <div style={{ color: 'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);

/*
  for exercises 9.24.-
*/
interface NumberProps extends FieldProps {
  label: string;
  errorMessage?: string;
  min: number;
  max: number;
}

export const NumberField = ({ field, label, min, max }: NumberProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field {...field} type="number" min={min} max={max} />

    <div style={{ color: 'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);

interface DateProps extends FieldProps {
  label: string;
  errorMessage?: string;
  fieldDisplay?: string;
}

export const DateField = ({ field, label, fieldDisplay }: DateProps) => (
  <Form.Field style={fieldDisplay}>
    <label>{label}</label>
    <Field {...field} type="date" />

    <div style={{ color: 'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);
