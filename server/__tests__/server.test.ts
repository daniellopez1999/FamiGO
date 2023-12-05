import app from '../app';
import request from 'supertest';
import { connectDB, disconnectDB } from '../dbConfig';

const credentials = {
  email: 'dani2@gmail.com',
  password: 'lopez2',
};

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await disconnectDB();
});

describe('Login procedure test', () => {
  let cookie: string;

  test('Login', async () => {
    try {
      const response = await request(app).post('/login').send(credentials);
      expect(response.status).toBe(200);

      cookie = response.headers['set-cookie'];
    } catch (error) {
      console.error(error);
      throw error;
    }
  });

  test('Feed', async () => {
    try {
      const response = await request(app)
        .get('/feed')
        .set('Cookie', cookie)
        .send();
      expect(response.status).toBe(200);
    } catch (error) {
      console.error(error);
      throw error;
    }
  });
});
