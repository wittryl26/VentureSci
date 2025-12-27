import { Router } from 'express';
import { getSupabaseClient } from '../config/supabase';
import { memoryStore } from '../services/dataStore';

export const profilesRouter = Router();

profilesRouter.get('/', (_req, res) => {
  res.json({ data: memoryStore.listProfiles() });
});

profilesRouter.post('/:profileId/links', async (req, res) => {
  const { profileId } = req.params;
  const { label, url } = req.body;

  if (!label || !url) {
    return res.status(400).json({ error: 'label and url are required' });
  }

  const profile = memoryStore.addCredibilityLink(profileId, { label, url });
  if (!profile) {
    return res.status(404).json({ error: 'Profile not found' });
  }

  const supabase = getSupabaseClient();
  if (supabase) {
    await supabase.from('profiles').upsert(profile);
  }

  return res.status(201).json({ data: profile });
});
