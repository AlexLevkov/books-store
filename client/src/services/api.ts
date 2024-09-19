import { Book, NewBook } from '../types';

const API_URL = 'http://localhost:2000/books';

export const fetchBooks = async (search: string = ''): Promise<Book[]> => {
  const response = await fetch(
    `${API_URL}${search ? `?search=${encodeURIComponent(search)}` : ''}`
  );
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return response.json();
};

export const addBook = async (book: NewBook): Promise<Book> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return response.json();
};

export const updateBook = async (book: Book): Promise<Book> => {
  const response = await fetch(`${API_URL}/${book.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return response.json();
};

export const deleteBooks = async (
  ids: number[]
): Promise<{ message: string }> => {
  const response = await fetch(API_URL, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ids }),
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return response.json();
};
