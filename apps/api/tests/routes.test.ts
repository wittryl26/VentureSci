import request from 'supertest';
import { createApp } from '../src/app';

const app = createApp();

describe('API routes', () => {
  it('responds to health', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });

  it('creates a funder request', async () => {
    const response = await request(app).post('/api/funder-requests').send({
      funderName: 'Unit Test Fund',
      projectId: 'proj-1',
      amountRequested: 12345,
      message: 'Need reviewers',
    });

    expect(response.status).toBe(201);
    expect(response.body.data.funderName).toBe('Unit Test Fund');
  });

  it('adds a project and credibility link', async () => {
    const project = await request(app).post('/api/projects').send({
      title: 'New project',
      principalInvestigator: 'QA',
      summary: 'Testing pipeline',
      tags: ['test'],
      organizationId: 'org-1',
    });

    expect(project.status).toBe(201);

    const profile = await request(app).post('/api/profiles/profile-1/links').send({
      label: 'Demo',
      url: 'https://venturesci.io',
    });

    expect(profile.status).toBe(201);
    expect(profile.body.data.credibility).toBeDefined();
  });
});
