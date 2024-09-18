// src/App.tsx
import React, { useEffect, useState } from 'react';
import { Book } from './types';
import {
  Container,
  Button,
  Spinner,
  Alert,
  Table,
  Row,
  Col,
  Form,
} from 'react-bootstrap';
import BookItem from './components/BookItem';
import Dialog from './components/Dialog';

const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // State for Dialog
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);

  // State for selected books
  const [selectedBooks, setSelectedBooks] = useState<Set<number>>(new Set());

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:2000/books');
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data: Book[] = await response.json();
      setBooks(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setCurrentBook(null);
    setShowDialog(true);
  };

  const handleEdit = (book: Book) => {
    setCurrentBook(book);
    setShowDialog(true);
  };

  const handleSave = async (book: any) => {
    if (book.id) {
      // Edit existing book
      try {
        const response = await fetch(`http://localhost:2000/books/${book.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(book),
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        // Update local state
        setBooks((prevBooks) =>
          prevBooks.map((b) => (b.id === book.id ? book : b))
        );
      } catch (err) {
        alert('Failed to update the book.');
      }
    } else {
      // Add new book
      try {
        const response = await fetch('http://localhost:2000/books', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(book),
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const newBook: Book = await response.json();
        setBooks((prevBooks) => [...prevBooks, newBook]);
      } catch (err) {
        alert('Failed to add the book.');
      }
    }
  };

  const handleSelect = (id: number, selected: boolean) => {
    setSelectedBooks((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (selected) {
        newSelected.add(id);
      } else {
        newSelected.delete(id);
      }
      return newSelected;
    });
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      const allIds = books.map((book) => book.id);
      setSelectedBooks(new Set(allIds));
    } else {
      setSelectedBooks(new Set());
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedBooks.size === 0) {
      alert('No books selected for deletion.');
      return;
    }

    if (
      !window.confirm('Are you sure you want to delete the selected book(s)?')
    ) {
      return;
    }

    try {
      const ids = Array.from(selectedBooks);
      const response = await fetch('http://localhost:2000/books', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      alert(result.message);
      // Remove deleted books from local state
      setBooks((prevBooks) =>
        prevBooks.filter((book) => !selectedBooks.has(book.id))
      );
      // Clear selected books
      setSelectedBooks(new Set());
    } catch (err) {
      if (err instanceof Error) {
        alert(`Failed to delete books. ${err.message}`);
      } else {
        alert('Failed to delete books.');
      }
    }
  };

  const isAllSelected = books.length > 0 && selectedBooks.size === books.length;
  const isIndeterminate =
    selectedBooks.size > 0 && selectedBooks.size < books.length;

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status" />
        <div>Loading...</div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">Error: {error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <Col>
          <h1>Book List</h1>
        </Col>
        <Col className="text-end">
          <div className="d-flex justify-content-end gap-3">
            <Button variant="danger" onClick={handleDeleteSelected}>
              Delete Selected
            </Button>
            <Button variant="success" onClick={handleAdd}>
              + Add New Book
            </Button>
          </div>
        </Col>
      </Row>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>
              <Form.Check
                type="checkbox"
                checked={isAllSelected}
                ref={(input: any) => {
                  if (input) input.indeterminate = isIndeterminate;
                }}
                onChange={(e) => handleSelectAll(e.target.checked)}
              />
            </th>
            <th>Title</th>
            <th>Author</th>
            <th>Price ($)</th>
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
                onEdit={handleEdit}
                isSelected={selectedBooks.has(book.id)}
                onSelect={handleSelect}
              />
            ))
          )}
        </tbody>
      </Table>

      <Dialog
        show={showDialog}
        handleClose={() => setShowDialog(false)}
        onSave={handleSave}
        initialData={currentBook || undefined}
      />
    </Container>
  );
};

export default App;
