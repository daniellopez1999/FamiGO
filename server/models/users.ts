import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    default: '',
    required: false,
  },
  authentication: {
    password: {
      type: String,
      required: true,
      select: false,
    },
    salt: {
      type: String,
      select: false,
    },
    sessionToken: {
      type: String,
      select: false,
    },
  },
  statistics: {
    followers: {
      type: [String],
      required: false,
    },
    following: {
      type: [String],
      required: false,
    },
    posts: {
      type: [String],
      required: false,
    },
  },
  avatar: {
    type: String,
    default: 'https://cdn-icons-png.flaticon.com/512/2058/2058258.png',
    required: true,
  },
  savedPosts: {
    type: [String],
    required: false,
  },
  savedAIPosts: {
    type: [String],
    required: false,
  },
});

//Model
export const UserModel = mongoose.model('User', userSchema);

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({
    'authentication.sessionToken': sessionToken,
  });
export const getUserByUserName = (username: string) =>
  UserModel.findOne({ username });
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());
