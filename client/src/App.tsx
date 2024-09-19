import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ActionButtons from './components/ActionButtons';
import BookTable from './components/BookTable';
import Dialog from './components/Dialog';
import LoadingSpinner from './components/LoadingSpinner';
import AlertMessage from './components/AlertMessage';
import ConfirmModal from './components/ConfirmModal';
import { Book, NewBook, AlertState } from './types';
import { fetchBooks, addBook, updateBook, deleteBooks } from './services/api';

const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Dialog
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);

  // selected books to delete
  const [selectedBooks, setSelectedBooks] = useState<Set<number>>(new Set());

  // global alerts
  const [alert, setAlert] = useState<AlertState>(null);

  // ConfirmationModal
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [confirmMessage, setConfirmMessage] = useState<string>('');
  const [confirmAction, setConfirmAction] = useState<() => void>(() => {});

  useEffect(() => {
    fetchBooksData();
  }, []);

  const fetchBooksData = async (query: string = '') => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchBooks(query);
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

  const handleSearch = (term: string) => {
    fetchBooksData(term);
  };

  const handleAdd = () => {
    setCurrentBook(null);
    setShowDialog(true);
  };

  const handleEdit = (book: Book) => {
    setCurrentBook(book);
    setShowDialog(true);
  };

  const handleSave = async (book: Book | NewBook): Promise<void> => {
    try {
      if ('id' in book) {
        const updatedBook = await updateBook(book);
        setBooks((prevBooks) =>
          prevBooks.map((b) => (b.id === updatedBook.id ? updatedBook : b))
        );
        setAlert({ variant: 'success', message: 'Book updated successfully!' });
      } else {
        const newBook = await addBook(book);
        setBooks((prevBooks) => [...prevBooks, newBook]);
        setAlert({ variant: 'success', message: 'Book added successfully!' });
      }
    } catch (err) {
      if (err instanceof Error) {
        setAlert({
          variant: 'danger',
          message: `Failed to save the book. ${err.message}`,
        });
      } else {
        setAlert({ variant: 'danger', message: 'Failed to save the book.' });
      }
      throw err;
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

  const handleDeleteSelected = () => {
    if (selectedBooks.size === 0) {
      setAlert({
        variant: 'warning',
        message: 'No books selected for deletion.',
      });
      return;
    }

    setConfirmMessage('Are you sure you want to delete the selected book(s)?');
    setConfirmAction(() => async () => {
      try {
        const ids = Array.from(selectedBooks);
        const result = await deleteBooks(ids);
        setAlert({ variant: 'success', message: result.message });
        setBooks((prevBooks) =>
          prevBooks.filter((book) => !selectedBooks.has(book.id))
        );
        setSelectedBooks(new Set());
      } catch (err) {
        if (err instanceof Error) {
          setAlert({
            variant: 'danger',
            message: `Failed to delete books. ${err.message}`,
          });
        } else {
          setAlert({ variant: 'danger', message: 'Failed to delete books.' });
        }
      } finally {
        setShowConfirm(false);
      }
    });
    setShowConfirm(true);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <Container className="mt-5">
        <AlertMessage
          variant="danger"
          message={`Error: ${error}`}
          onClose={() => setError(null)}
        />
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      {alert && (
        <Row className="mb-3">
          <Col>
            <AlertMessage
              variant={alert.variant}
              message={alert.message}
              onClose={() => setAlert(null)}
            />
          </Col>
        </Row>
      )}

      <Header />

      <Row className="mb-4">
        <Col md={6}>
          <SearchBar onSearch={handleSearch} />
        </Col>
        <Col className="text-end">
          <ActionButtons
            onDeleteSelected={handleDeleteSelected}
            onAddNew={handleAdd}
            isDeleteDisabled={selectedBooks.size === 0}
          />
        </Col>
      </Row>

      <BookTable
        books={books}
        onEdit={handleEdit}
        selectedBooks={selectedBooks}
        onSelect={handleSelect}
        onSelectAll={handleSelectAll}
      />

      <Dialog
        show={showDialog}
        handleClose={() => setShowDialog(false)}
        onSave={handleSave}
        initialData={currentBook || undefined}
      />

      <ConfirmModal
        show={showConfirm}
        title="Confirm Deletion"
        message={confirmMessage}
        onConfirm={confirmAction}
        onCancel={() => setShowConfirm(false)}
      />
    </Container>
  );
};

export default App;
