import { Router } from 'express';
import { memoryStore } from '../services/dataStore';

export const organizationsRouter = Router();

organizationsRouter.get('/', (_req, res) => {
  res.json({ data: memoryStore.listOrganizations() });
});

organizationsRouter.get('/:id', (req, res) => {
  const org = memoryStore.getOrganization(req.params.id);
  if (!org) {
    return res.status(404).json({ error: 'Organization not found' });
  }
  return res.json({ data: org });
});
