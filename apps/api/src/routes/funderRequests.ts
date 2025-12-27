import { Router } from 'express';
import { getSupabaseClient } from '../config/supabase';
import { memoryStore } from '../services/dataStore';

export const funderRequestRouter = Router();

funderRequestRouter.get('/', (_req, res) => {
  res.json({ data: memoryStore.listFunderRequests() });
});

funderRequestRouter.post('/', async (req, res) => {
  const { funderName, projectId, amountRequested, message } = req.body;
  if (!funderName || !projectId) {
    return res.status(400).json({ error: 'funderName and projectId are required' });
  }

  const request = memoryStore.upsertFunderRequest({
    funderName,
    projectId,
    amountRequested: Number(amountRequested) || 0,
    message: message ?? '',
  });

  const supabase = getSupabaseClient();
  if (supabase) {
    await supabase.from('funder_requests').upsert(request);
  }

  return res.status(201).json({ data: request });
});
