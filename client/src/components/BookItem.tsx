// src/components/BookItem.tsx
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Book } from '../types';
import { LiaEditSolid } from 'react-icons/lia';

type BookItemProps = {
  book: Book;
  onEdit: (book: Book) => void;
  isSelected: boolean;
  onSelect: (id: number, selected: boolean) => void;
};

const BookItem: React.FC<BookItemProps> = ({
  book,
  onEdit,
  isSelected,
  onSelect,
}) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelect(book.id, e.target.checked);
  };

  return (
    <tr>
      <td>
        <Form.Check
          type="checkbox"
          checked={isSelected}
          onChange={handleCheckboxChange}
        />
      </td>
      <td>{book.title}</td>
      <td>{book.author}</td>
      <td>{book.price}</td>
      <td>{book.quantity}</td>
      <td>
        <Button
          variant="warning"
          className="mx-3 d-flex align-items-center justify-content-center"
          size="sm"
          onClick={() => onEdit(book)}
        >
          <LiaEditSolid className="me-2" />
          Edit
        </Button>
      </td>
    </tr>
  );
};
export default BookItem;
