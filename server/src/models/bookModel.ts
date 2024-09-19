// src/models/bookModel.ts
import pool from '../config/db';

export type Book = {
  id: number;
  title: string;
  author: string;
  price: number;
  quantity: number;
};

export type NewBook = Omit<Book, 'id'>;

export const getAllBooks = async (search?: string): Promise<Book[]> => {
  if (search) {
    const query = `
      SELECT * FROM books
      WHERE LOWER(title) LIKE LOWER($1)
         OR LOWER(author) LIKE LOWER($1)
      ORDER BY id ASC;
    `;
    const values = [`%${search}%`];
    const result = await pool.query(query, values);
    return result.rows;
  } else {
    const query = 'SELECT * FROM books ORDER BY id ASC;';
    const result = await pool.query(query);
    return result.rows;
  }
};

export const createBook = async (newBook: NewBook): Promise<Book> => {
  const query = `
    INSERT INTO books (title, author, price, quantity)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [
    newBook.title,
    newBook.author,
    newBook.price,
    newBook.quantity,
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const updateBook = async (
  id: number,
  updatedFields: Partial<Omit<Book, 'id'>>
): Promise<Book | null> => {
  const setClauses = [];
  const values = [];
  let index = 1;

  for (const field in updatedFields) {
    setClauses.push(`${field} = $${index}`);
    values.push((updatedFields as any)[field]);
    index++;
  }

  values.push(id);

  const query = `
    UPDATE books
    SET ${setClauses.join(', ')}
    WHERE id = $${index}
    RETURNING *;
  `;

  const result = await pool.query(query, values);
  return result.rows[0] || null;
};

export const deleteBooks = async (ids: number[]): Promise<number> => {
  const placeholders = ids.map((_, idx) => `$${idx + 1}`).join(', ');
  const query = `DELETE FROM books WHERE id IN (${placeholders}) RETURNING *;`;
  const result = await pool.query(query, ids);
  return result.rowCount ?? 0; // Provides a default value if rowCount is null
};
