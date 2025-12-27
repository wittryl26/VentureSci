import request from 'supertest';
import { createApp } from '../src/app';

describe('API server', () => {
  const app = createApp();

  it('returns health status', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok', service: 'api' });
  });

  it('returns core service availability', async () => {
    const response = await request(app).get('/services/core');

    expect(response.status).toBe(200);
    expect(response.body.service).toBe('core');
    expect(response.body.status).toBe('available');
    expect(typeof response.body.uptimeSeconds).toBe('number');
  });
});
