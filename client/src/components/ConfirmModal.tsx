import React from 'react';
import { Modal, Button } from 'react-bootstrap';

type ConfirmModalProps = {
  show: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  show,
  title,
  message,
  onConfirm,
  onCancel,
}) => (
  <Modal show={show} onHide={onCancel} centered>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{message}</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onCancel}>
        Cancel
      </Button>
      <Button variant="danger" onClick={onConfirm}>
        Delete
      </Button>
    </Modal.Footer>
  </Modal>
);

export default ConfirmModal;
