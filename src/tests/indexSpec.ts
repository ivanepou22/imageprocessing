import supertest from 'supertest';
import app from '../index';

//write end point test with jasmine
const request = supertest(app);

describe('Test end point response', () => {
  it('Gets the Api End point', async () => {
    const response = await request.get('/api/v1');
    expect(response.status).toBe(200);
    // done();
  });
});
