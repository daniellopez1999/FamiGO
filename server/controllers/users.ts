import express from 'express';
import {
  createUser,
  getUserByEmail,
  getUserById,
  getUserByUserName,
} from '../models/users';
import { random, authentication } from '../helpers';

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.sendStatus(400);
    }

    const user = await getUserByUserName(username).select(
      '+authentication.salt +authentication.password'
    );

    if (!user) {
      return res.sendStatus(400);
    }

    const expectedHash = authentication(user.authentication!.salt!, password);

    if (user.authentication!.password != expectedHash) {
      return res.sendStatus(403);
    }

    const salt = random();
    user.authentication!.sessionToken = authentication(
      salt,
      user._id.toString()
    );

    await user.save();

    res.cookie('CookieFamiGO', user.authentication!.sessionToken, {
      domain: 'localhost',
      path: '/',
    });

    return res.status(200).json(user).end();
  } catch (error) {
    return res.status(400);
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;

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
    });

    return res.status(200).json(user).end();
  } catch (error) {
    return res.sendStatus(400);
  }
};

export const updateUserAvatar = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { avatar } = req.body;

    const user = await getUserById(id);

    user!.avatar = avatar;
    await user!.save();

    return res.status(200).json(user).end();
  } catch (error) {
    return res.sendStatus(400);
  }
};
