// src/config/db.ts
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
  console.log('process.env.POSTGRES_USER:', process.env.POSTGRES_USER);
  console.log('process.env.POSTGRES_HOST:', process.env.POSTGRES_HOST);
  console.log('process.env.POSTGRES_DB:', process.env.POSTGRES_DB);
  console.log('process.env.POSTGRES_PASSWORD:', process.env.POSTGRES_PASSWORD);
  console.log('process.env.POSTGRES_PORT:', process.env.POSTGRES_PORT);
});

export default pool;
