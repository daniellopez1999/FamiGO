import express from 'express';

import { getUsers } from '../models/users';

export const getAllUsers = async (
  _req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsers();

    return res.status(200).json(users);
  } catch (error) {
    return res.sendStatus(400);
  }
};
