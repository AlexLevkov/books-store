import React, { useEffect, useRef } from 'react';
import { Table, Form } from 'react-bootstrap';
import BookItem from './BookItem';
import { Book } from '../types';

type BookTableProps = {
  books: Book[];
  onEdit: (book: Book) => void;
  selectedBooks: Set<number>;
  onSelect: (id: number, selected: boolean) => void;
  onSelectAll: (selected: boolean) => void;
};

const BookTable: React.FC<BookTableProps> = ({
  books,
  onEdit,
  selectedBooks,
  onSelect,
  onSelectAll,
}) => {
  const selectAllRef = useRef<HTMLInputElement>(null);

  const isAllSelected = books.length > 0 && selectedBooks.size === books.length;
  const isIndeterminate =
    selectedBooks.size > 0 && selectedBooks.size < books.length;

  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = isIndeterminate;
    }
  }, [isIndeterminate]);

  return (
    <div className="container-fluid px-0">
      <Table bordered hover responsive="sm">
        <thead>
          <tr>
            <th>
              <Form.Check
                type="checkbox"
                checked={isAllSelected}
                ref={selectAllRef}
                onChange={(e) => onSelectAll(e.target.checked)}
              />
            </th>
            <th>Title</th>
            <th>Author</th>
            <th>Price($)</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center">
                No books available.
              </td>
            </tr>
          ) : (
            books.map((book) => (
              <BookItem
                key={book.id}
                book={book}
                onEdit={onEdit}
                isSelected={selectedBooks.has(book.id)}
                onSelect={onSelect}
              />
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default BookTable;
