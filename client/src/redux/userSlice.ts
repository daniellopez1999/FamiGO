import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { IUser } from '../types/user';
import { useAppSelector } from './hooks';

type userState = {
  user: null | IUser;
  savedPosts: null | string[];
};

const initialState: userState = {
  user: null,
  savedPosts: null,
};

// slice
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        user: action.payload,
        savedPosts: action.payload.savedPosts,
      };
    },

    addMyPost: (state, action: PayloadAction<any>) => {
      const id = action.payload;
      state.user?.statistics.posts.push(id);
    },

    addSavedPost: (state, action: PayloadAction<any>) => {
      const id = action.payload;
      const curr = state.savedPosts as string[];
      const updated = [...curr];
      updated.push(id);

      return {
        ...state,
        savedPosts: updated,
      };
    },

    removeSavedPost: (state, action: PayloadAction<any>) => {
      const id = action.payload;
      const curr = state.savedPosts as string[];
      const updated = curr?.filter((postId) => postId !== id);

      return {
        ...state,
        savedPosts: updated,
      };
    },
  },
});

// action
export const { setUser, addMyPost, addSavedPost, removeSavedPost } =
  userSlice.actions;

// selector
export const getUser = () => useAppSelector((state) => state.user.user);
export const getMyUsername = () =>
  useAppSelector((state) => state.user.user?.username);
export const getMySavedPost = () =>
  useAppSelector((state) => state.user.savedPosts);

// reducer
export const userReducer = userSlice.reducer;
