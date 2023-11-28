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

export interface UserData {
  statistics: UserStatistics;
  _id: string;
  username: string;
  email: string;
  avatar: string;
  savedPosts: any[];
  __v: number;
}

export interface UsersData {
  [key: string]: {
    statistics: UserStatistics;
    _id: string;
    username: string;
    email: string;
    avatar: string;
    savedPosts: any[];
    __v: number;
  };
}

export interface UserStatistics {
  followers: any[];
  following: any[];
  posts: string[];
}
