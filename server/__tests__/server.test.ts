import app from '../app';
import request from 'supertest';
import { connectDB, disconnectDB } from '../dbConfig';
import mock from '../testMockData/mockData';

beforeAll(async () => {
  await connectDB();
  //login and set cookie of login
  try {
    const response = await request(app).post('/login').send(mock.credentials);
    expect(response.status).toBe(200);
    mock.cookie = response.headers['set-cookie'];
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
        .set('Cookie', mock.cookie)
        .send();
      expect(response.status).toBe(200);
    } catch (error) {
      console.error(error);
      throw error;
    }
  });
});

describe('GET Activity / Profile', () => {
  test('Get Activity Data 1', async () => {
    try {
      const response = await request(app)
        .get(`/get-activity/${mock.activityID[0]}`)
        .set('Cookie', mock.cookie)
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
        .get(`/get-activity/${mock.activityID[1]}`)
        .set('Cookie', mock.cookie)
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
        .get(`/user/${mock.username}`)
        .set('Cookie', mock.cookie)
        .send();
      expect(response.status).toBe(200);

      mock.profileData = response.body;
    } catch (error) {
      console.error(error);
      throw error;
    }
  });
});

//If post is saved, unsave it, will return 201. If it's not saved it, save it, will return 200
describe('Save / Unsave Activity', () => {
  test('Check if Activity is Saved or Unsaved correctly', async () => {
    if (mock.profileData.savedPosts.includes(mock.activityIDToSave)) {
      try {
        const response = await request(app)
          .post(`/savepost-in-user/${mock.username}/${mock.activityIDToSave}`)
          .set('Cookie', mock.cookie)
          .send();
        expect(response.status).toBe(201);
      } catch (error) {
        console.error(error);
        throw error;
      }
    } else {
      try {
        const response = await request(app)
          .post(`/savepost-in-user/${mock.username}/${mock.activityIDToSave}`)
          .set('Cookie', mock.cookie)
          .send();
        expect(response.status).toBe(200);
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  });
});

//Post activity
describe('Create / Delete Activity', () => {
  var createdActivityID = '';
  test('Create Activity', async () => {
    try {
      const response = await request(app)
        .post(`/publish-activity`)
        .set('Cookie', mock.cookie)
        .send(mock.createActivityData);
      expect(response.status).toBe(201);
      createdActivityID = response.body._id;
    } catch (error) {
      console.error(error);
      throw error;
    }
  });
  test('Delete Activity', async () => {
    try {
      const response = await request(app)
        .delete(`/delete-activity/${mock.username}/${createdActivityID}`)
        .set('Cookie', mock.cookie)
        .send();
      expect(response.status).toBe(200);
    } catch (error) {
      console.error(error);
      throw error;
    }
  });
});
