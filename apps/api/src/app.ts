import cors from 'cors';
import express, { Request, Response } from 'express';
import { apiRouter } from './routes';
import { env } from './config/env';
import { getSupabaseClient } from './config/supabase';

export const createApp = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({
      status: 'ok',
      service: 'api',
      uptimeSeconds: Math.round(process.uptime()),
      supabaseConnected: Boolean(getSupabaseClient()),
    });
  });

  app.get('/services/core', (_req: Request, res: Response) => {
    res.status(200).json({
      status: 'available',
      service: 'core',
      uptimeSeconds: Math.round(process.uptime()),
      streamChatEnabled: Boolean(env.streamChatKey),
    });
  });

  app.use('/api', apiRouter);

  return app;
};

export default createApp;
