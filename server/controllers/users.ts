import express from 'express';
import { createUser, getUserByEmail, getUserByUserName } from '../models/users';
import { random, authentication } from '../helpers';

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username, avatar } = req.body;

    if (!email || !password || !username) {
      return res.sendStatus(400);
    }

    const existingUserEmail = await getUserByEmail(email);
    const existingUserName = await getUserByUserName(username);

    if (existingUserEmail || existingUserName) {
      return res.sendStatus(400);
    }

    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
      avatar,
    });

    return res.status(200).json(user).end();
  } catch (error) {
    return res.sendStatus(400);
  }
};
