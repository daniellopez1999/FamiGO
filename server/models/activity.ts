import mongoose from 'mongoose';
//import { UserModel } from './users';

const Schema = mongoose.Schema;

const url = 'mongodb://127.0.0.1:27017/FamiGO';

mongoose
  .connect(url)
  .then(() => {
    console.log('Connected to the database using Mongoose');
  })
  .catch((err) => {
    console.log('Error connecting to the database:', err);
  });

const activitySchema = new Schema({
  userInfo: {
    username: {
      type: String,
      required: true,
    },
  },

  title: {
    type: String,
    required: true,
  },

  material: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  filters: {
    topic: {
      type: String,
      required: true,
    },
    numOfKids: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
  },
  likes: {
    type: [String],
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  comments: {
    username: {
      type: String,
      required: false,
    },
    text: {
      type: String,
      required: false,
    },
  },
  type: {
    type: String,
    default: 'published',
    required: true,
  },
});

//Model
export const ActivityModel = mongoose.model('Activity', activitySchema);

export const getActivities = () => ActivityModel.find();
// export const createActivity = (values: Record<string, any>) => {
//   new ActivityModel(values).save().then((user) => user.toObject());
// };
