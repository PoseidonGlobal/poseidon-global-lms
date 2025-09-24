import { describe, it, expect } from 'vitest';

describe('smoke', () => {
  it('adds numbers', () => {
    expect(1 + 2).toBe(3);
  });
});

const assert = require('assert');
const request = require('supertest');
const app = require('../app'); // Adjust the path as necessary

describe('Backend API', () => {
  it('should return a 200 response for the root route', async () => {
    const response = await request(app).get('/');
    assert.strictEqual(response.status, 200);
  });

  it('should return a JSON object from /api/data', async () => {
    const response = await request(app).get('/api/data');
    assert.strictEqual(response.status, 200);
    assert.strictEqual(
      response.headers['content-type'],
      'application/json; charset=utf-8'
    );
  });
});
