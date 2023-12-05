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

const createActivityData = {
  activity: {
    image:
      'https://res.cloudinary.com/dgea5fmdr/image/upload/v1701795466/file_mhoyff.jpg',
    filters: {
      topic: 'Art',
      numOfKids: '1',
      age: '0 - 3',
      difficulty: 'Beginner',
      place: 'Outside',
      duration: '< 1h',
    },
    title: 'a',
    materials: ['a'],
    description: 'a',
  },
};

const type = 'others';

export default {
  credentials,
  activityID,
  activityIDToSave,
  username,
  profileData,
  cookie,
  createActivityData,
  type,
};
