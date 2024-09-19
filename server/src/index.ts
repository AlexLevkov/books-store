// src/index.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bookRoutes from './routes/bookRoutes';
import { errorHandler } from './middleware/errorHandler';
// Optional: import { logger } from './utils/logger';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 2000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
  })
);
// Optional: app.use(logger);

// Routes
app.use('/books', bookRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
