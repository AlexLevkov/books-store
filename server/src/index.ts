// src/index.ts
import express, { Request, Response } from 'express';
import { Pool } from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables from a .env file if present
dotenv.config();

// Define the Book type
type Book = {
  id: number;
  title: string;
  author: string;
  price: number;
  quantity: number;
};

// Define the type for creating a new book (without id)
type NewBook = {
  title: string;
  author: string;
  price: number;
  quantity: number;
};

// Define the type for updating a book (all fields optional except id)
type UpdateBook = Partial<Omit<Book, 'id'>>;

// Set up the Express app
const app = express();
const PORT = process.env.PORT || 2000;

// Middleware to parse JSON bodies
app.use(express.json());

// Configure CORS to allow requests from your client origins
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
  })
);

// Configure the PostgreSQL connection using environment variables
const pool = new Pool({
  user: process.env.POSTGRES_USER || 'book_admin',
  host: 'localhost', //process.env.POSTGRES_HOST || 'postgres', // Use the service name 'postgres'
  database: process.env.POSTGRES_DB || 'books_db',
  password: process.env.POSTGRES_PASSWORD || 'abc',
  port: Number(process.env.POSTGRES_PORT) || 5432,
});

// Endpoint to get all books from the database
app.get('/books', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM books');
    res.json(result.rows);
  } catch (error) {
    console.error('Error querying the database:', error);
    res.status(500).send('Error querying the database');
  }
});

// Endpoint to add a new book
app.post('/books', async (req: Request, res: Response) => {
  const { title, author, price, quantity } = req.body as NewBook;
  console.log(' req.body:', req.body);

  // Basic validation
  if (
    !title ||
    !author ||
    typeof price !== 'number' ||
    typeof quantity !== 'number'
  ) {
    return res.status(400).send('Invalid book data provided.');
  }

  try {
    const insertQuery = `
      INSERT INTO books (title, author, price, quantity)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [title, author, price, quantity];
    const result = await pool.query(insertQuery, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting into the database:', error);
    res.status(500).send('Error inserting the book into the database');
  }
});

// Endpoint to update an existing book by ID
app.put('/books/:id', async (req: Request, res: Response) => {
  const bookId = parseInt(req.params.id, 10);
  const { title, author, price, quantity } = req.body as UpdateBook;

  if (isNaN(bookId)) {
    return res.status(400).send('Invalid book ID.');
  }

  // Check if at least one field is provided for update
  if (
    title === undefined &&
    author === undefined &&
    price === undefined &&
    quantity === undefined
  ) {
    return res.status(400).send('No fields provided for update.');
  }

  try {
    // Build dynamic SET clause
    const fields: string[] = [];
    const values: any[] = [];
    let index = 1;

    if (title !== undefined) {
      fields.push(`title = $${index++}`);
      values.push(title);
    }
    if (author !== undefined) {
      fields.push(`author = $${index++}`);
      values.push(author);
    }
    if (price !== undefined) {
      fields.push(`price = $${index++}`);
      values.push(price);
    }
    if (quantity !== undefined) {
      fields.push(`quantity = $${index++}`);
      values.push(quantity);
    }

    values.push(bookId); // Add bookId as the last parameter

    const updateQuery = `
      UPDATE books
      SET ${fields.join(', ')}
      WHERE id = $${index}
      RETURNING *;
    `;

    const result = await pool.query(updateQuery, values);

    if (result.rows.length === 0) {
      return res.status(404).send('Book not found.');
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating the book:', error);
    res.status(500).send('Error updating the book in the database');
  }
});

// Endpoint to delete multiple books by an array of IDs
app.delete('/books', async (req: Request, res: Response) => {
  const { ids } = req.body;

  if (!Array.isArray(ids) || !ids.every((id) => typeof id === 'number')) {
    return res
      .status(400)
      .send('Invalid data. "ids" must be an array of numbers.');
  }

  if (ids.length === 0) {
    return res.status(400).send('"ids" array cannot be empty.');
  }

  try {
    // Create a dynamic parameterized query
    const placeholders = ids.map((_, idx) => `$${idx + 1}`).join(', ');
    const deleteQuery = `
      DELETE FROM books
      WHERE id IN (${placeholders})
      RETURNING *;
    `;
    const result = await pool.query(deleteQuery, ids);

    res.json({
      message: `${result.rowCount} book(s) deleted successfully.`,
      deletedBooks: result.rows,
    });
  } catch (error) {
    console.error('Error deleting books:', error);
    res.status(500).send('Error deleting books from the database');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running quickly on http://localhost:${PORT}`);
  // console.log('POSTGRES_HOST:', process.env.POSTGRES_HOST);
  // console.log('POSTGRES_USER:', process.env.POSTGRES_USER);
  // console.log('POSTGRES_DB:', process.env.POSTGRES_DB);
  // console.log('POSTGRES_PASSWORD:', process.env.POSTGRES_PASSWORD);
  // console.log('POSTGRES_PORT:', process.env.POSTGRES_PORT);
});
