import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.POSTGRES_USER || 'book_admin',
  host: process.env.POSTGRES_HOST || 'localhost',
  database: process.env.POSTGRES_DB || 'books_db',
  password: process.env.POSTGRES_PASSWORD || 'abc',
  port: Number(process.env.POSTGRES_PORT) || 5432,
});

pool.on('connect', () => {
  console.log('Connected to the PostgreSQL database.');
});

export default pool;
