import app from '../app';
import request from 'supertest';
import { connectDB, disconnectDB } from '../dbConfig';

const credentials = {
  email: 'dani2@gmail.com',
  password: 'lopez2',
};

var cookie = '';

beforeAll(async () => {
  await connectDB();
  //login and set cookie of login
  try {
    const response = await request(app).post('/login').send(credentials);
    expect(response.status).toBe(200);

    cookie = response.headers['set-cookie'];
  } catch (error) {
    console.error(error);
    throw error;
  }
});

afterAll(async () => {
  await disconnectDB();
});

describe('Load Feed', () => {
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
