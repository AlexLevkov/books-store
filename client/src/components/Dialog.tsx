import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Book, NewBook } from '../types';
import AlertMessage from './AlertMessage';

type DialogProps = {
  show: boolean;
  handleClose: () => void;
  onSave: (book: Book | NewBook) => Promise<void>;
  initialData?: Book;
};

const Dialog: React.FC<DialogProps> = ({
  show,
  handleClose,
  onSave,
  initialData,
}) => {
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setAuthor(initialData.author);
      setPrice(initialData.price.toString());
      setQuantity(initialData.quantity.toString());
    } else {
      setTitle('');
      setAuthor('');
      setPrice('');
      setQuantity('');
    }
    setError(null); 
  }, [initialData, show]);

  const handleSubmit = async () => {
  
    if (
      title.trim() === '' ||
      author.trim() === '' ||
      price.trim() === '' ||
      quantity.trim() === ''
    ) {
      setError('Please fill in all fields.');
      return;
    }

    const parsedPrice = parseFloat(price);
    const parsedQuantity = parseInt(quantity, 10);

    if (isNaN(parsedPrice) || parsedPrice < 0) {
      setError('Please enter a valid non-negative number for price.');
      return;
    }

    if (isNaN(parsedQuantity) || parsedQuantity < 0) {
      setError('Please enter a valid non-negative integer for quantity.');
      return;
    }

    const book: Book | NewBook = initialData
      ? {
          id: initialData.id,
          title,
          author,
          price: parsedPrice,
          quantity: parsedQuantity,
        }
      : {
          title,
          author,
          price: parsedPrice,
          quantity: parsedQuantity,
        };

    try {
      await onSave(book);
      handleClose();
    } catch (error) {
      setError('An error occurred while saving the book.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{initialData ? 'Edit Book' : 'Add New Book'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && (
          <AlertMessage
            variant="danger"
            message={error}
            onClose={() => setError(null)}
          />
        )}
        <Form>
     
          <Form.Group controlId="formBookTitle" className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter book title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
    
          <Form.Group controlId="formBookAuthor" className="mb-3">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter author's name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </Form.Group>
  
          <Form.Group controlId="formBookPrice" className="mb-3">
            <Form.Label>Price ($)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter book price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min="0"
              step="0.1"
            />
          </Form.Group>

          <Form.Group controlId="formBookQuantity" className="mb-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter quantity available"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="0"
              step="1"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {initialData ? 'Update' : 'Add'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Dialog;
