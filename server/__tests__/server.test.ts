import app from '../app';
import request from 'supertest';
import { connectDB, disconnectDB } from '../dbConfig';

const credentials = {
  email: 'dani2@gmail.com',
  password: 'lopez2',
};

const activityID = {
  0: '6569e21f5eea23b118284abe',
  1: '656f38edde117c8d7ad025e7',
};

const activityIDToSave = '6569fd7d1fb3a9b099125914';

const username = 'dani2';

var profileData: any = {};

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

describe('Activity', () => {
  test('Get Activity Data 1', async () => {
    try {
      const response = await request(app)
        .get(`/get-activity/${activityID[0]}`)
        .set('Cookie', cookie)
        .send();
      expect(response.status).toBe(200);
      expect(response.body.activityInfo.description).toBe('7w7');
    } catch (error) {
      console.error(error);
      throw error;
    }
  });

  test('Get Activity Data 2', async () => {
    try {
      const response = await request(app)
        .get(`/get-activity/${activityID[1]}`)
        .set('Cookie', cookie)
        .send();
      expect(response.status).toBe(200);
      expect(response.body.activityInfo.description).toBe('willy wonka');
    } catch (error) {
      console.error(error);
      throw error;
    }
  });

  test('Get my profile data', async () => {
    try {
      const response = await request(app)
        .get(`/user/${username}`)
        .set('Cookie', cookie)
        .send();
      expect(response.status).toBe(200);

      profileData = response.body;
    } catch (error) {
      console.error(error);
      throw error;
    }
  });

  //If post is saved, unsave it, will return 201. If it's not saved it, save it, will return 200
  test('Check if Activity is Saved or Unsaved correctly', async () => {
    if (profileData.savedPosts.includes(activityIDToSave)) {
      try {
        const response = await request(app)
          .post(`/savepost-in-user/${username}/${activityIDToSave}`)
          .set('Cookie', cookie)
          .send();
        expect(response.status).toBe(201);
      } catch (error) {
        console.error(error);
        throw error;
      }
    } else {
      try {
        const response = await request(app)
          .post(`/savepost-in-user/${username}/${activityIDToSave}`)
          .set('Cookie', cookie)
          .send();
        expect(response.status).toBe(200);
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  });
});
