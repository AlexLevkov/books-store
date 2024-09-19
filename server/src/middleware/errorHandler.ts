// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';

// Centralized error handling middleware
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  res.status(500).send('An unexpected error occurred.');
};
