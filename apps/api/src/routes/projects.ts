import { Router } from 'express';
import { getSupabaseClient } from '../config/supabase';
import { memoryStore } from '../services/dataStore';

export const projectsRouter = Router();

projectsRouter.get('/', (_req, res) => {
  res.json({ data: memoryStore.listProjects() });
});

projectsRouter.post('/', async (req, res) => {
  const { title, principalInvestigator, summary, tags, organizationId } = req.body;
  if (!title || !principalInvestigator) {
    return res.status(400).json({ error: 'title and principalInvestigator are required' });
  }

  const project = memoryStore.addProject({
    title,
    principalInvestigator,
    summary: summary ?? '',
    tags: tags ?? [],
    organizationId: organizationId ?? 'org-1',
  });

  const supabase = getSupabaseClient();
  if (supabase) {
    await supabase.from('research_projects').upsert(project);
  }

  return res.status(201).json({ data: project });
});
