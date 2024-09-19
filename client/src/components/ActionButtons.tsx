import React from 'react';
import { Button } from 'react-bootstrap';
import { FaTrash, FaPlus } from 'react-icons/fa'; // Import the icons

type ActionButtonsProps = {
  onDeleteSelected: () => void;
  onAddNew: () => void;
  isDeleteDisabled: boolean;
};

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onDeleteSelected,
  onAddNew,
  isDeleteDisabled,
}) => (
  <div className="d-flex justify-content-center justify-content-md-center justify-content-lg-end gap-3 mt-3 mt-md-0  ">
    {/* Delete Selected Button */}
    <Button
      className="d-flex align-items-center justify-content-center text-nowrap"
      variant="danger"
      onClick={onDeleteSelected}
      disabled={isDeleteDisabled}
    >
      <FaTrash className="me-2" />
      Delete Selected
    </Button>

    <Button
      className="d-flex align-items-center justify-content-center text-nowrap"
      variant="success"
      onClick={onAddNew}
    >
      <FaPlus className="me-2" />
      Add New Book
    </Button>
  </div>
);

export default ActionButtons;
