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

const savedActivitySchema = new Schema({
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
  title: {
    type: String,
    required: true,
  },
  materials: {
    type: Array<String>,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
export const SavedActivityModel = mongoose.model(
  'savedActivities',
  savedActivitySchema
);
