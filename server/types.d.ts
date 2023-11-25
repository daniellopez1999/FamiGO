export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
  followers?: [string];
  following?: [string];
  posts?: [string];
  savedPosts?: [string];
}