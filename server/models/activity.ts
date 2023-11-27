import mongoose from 'mongoose';

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
    avatar: {
      type: String,
      required: true,
    },
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
    },
    text: {
      type: String,
    },
  },
  type: {
    type: String,
    required: true,
  },
});

//Model
export const UserModel = mongoose.model('Activity', activitySchema);
