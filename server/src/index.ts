import express from 'express';
import { Pool } from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables from a .env file if present
dotenv.config();

console.log('POSTGRES_HOST:', process.env.POSTGRES_HOST);
console.log('POSTGRES_USER:', process.env.POSTGRES_USER);
console.log('POSTGRES_DB:', process.env.POSTGRES_DB);
console.log('POSTGRES_PASSWORD:', process.env.POSTGRES_PASSWORD);
console.log('POSTGRES_PORT:', process.env.POSTGRES_PORT);

// Set up the Express app
const app = express();
const PORT = process.env.PORT || 2000;

// Configure CORS to allow requests from your client origins
app.use(
  cors({
    origin: ['http://localhost:5174', 'http://localhost:3000'],
  })
);

// Configure the PostgreSQL connection using environment variables
const pool = new Pool({
  user: process.env.POSTGRES_USER || 'book_admin',
  host: process.env.POSTGRES_HOST || 'postgres', // Use the service name 'postgres'
  database: process.env.POSTGRES_DB || 'books_db',
  password: process.env.POSTGRES_PASSWORD || 'abc',
  port: Number(process.env.POSTGRES_PORT) || 5432,
});

// Endpoint to get all books from the database
app.get('/books', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM books');
    res.json(result.rows);
  } catch (error) {
    console.error('Error querying the database:', error);
    res.status(500).send('Error querying the database');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running quickly on http://localhost:${PORT}`);
  console.log('POSTGRES_HOST:', process.env.POSTGRES_HOST);
  console.log('POSTGRES_USER:', process.env.POSTGRES_USER);
  console.log('POSTGRES_DB:', process.env.POSTGRES_DB);
  console.log('POSTGRES_PASSWORD:', process.env.POSTGRES_PASSWORD);
  console.log('POSTGRES_PORT:', process.env.POSTGRES_PORT);
});
