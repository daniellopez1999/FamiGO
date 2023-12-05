const mongoose = require('mongoose');

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI).then(() => {
      console.log('Connected to the database using Mongoose');
    });
  } catch (error) {
    console.log('Error connecting to the database:', error);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  await mongoose.disconnect();
};
