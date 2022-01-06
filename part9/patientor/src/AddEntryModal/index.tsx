import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import { IEntryFormValues } from '../types';

import AddEntryForm from './AddEntryForm';

interface IAddEntryFormProps {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: IEntryFormValues) => void;
  error?: string;
}

const AddEntryModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
}: IAddEntryFormProps) => {
  return (
    <Modal onClose={onClose} open={modalOpen} closeIcon>
      <Modal.Header>Add a new entry</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <AddEntryForm onSubmit={onSubmit} onCancel={onClose} />
      </Modal.Content>
    </Modal>
  );
};

export default AddEntryModal;
