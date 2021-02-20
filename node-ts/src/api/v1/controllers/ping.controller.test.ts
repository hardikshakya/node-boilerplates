/* eslint-disable no-undef */
import request from 'supertest';

import app from '../../../app';

test('Test Ping Controller', async () => {
  const result = await request(app).get('/api/v1/ping').send();

  expect(result.status).toBe(200);
  expect(result.body.data).toBe('Pong!');
});
