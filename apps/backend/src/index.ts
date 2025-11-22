/**
 * MaxSam V4 Backend Entry Point
 * 
 * This is the main server file that initializes:
 * - Express server
 * - API routes
 * - Database connections
 * - Middleware
 * - Error handling
 */

import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// API routes will be mounted here
// TODO: Import and mount route modules from ./routes

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`⚡️ MaxSam Backend running on http://localhost:${port}`);
    console.log(`   Health check: http://localhost:${port}/health`);
  });
}

export default app;
