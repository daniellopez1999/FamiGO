import { Request, Response } from 'express';

import { getUsers } from '../models/users';

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await getUsers();

    return res.status(200).json(users);
  } catch (error) {
    return res.sendStatus(400);
  }
};
