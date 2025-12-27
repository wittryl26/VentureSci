import express, { Request, Response } from 'express';

export const createApp = () => {
  const app = express();

  app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'ok', service: 'api' });
  });

  app.get('/services/core', (_req: Request, res: Response) => {
    res.status(200).json({
      status: 'available',
      service: 'core',
      uptimeSeconds: Math.round(process.uptime()),
    });
  });

  return app;
};

export default createApp;
