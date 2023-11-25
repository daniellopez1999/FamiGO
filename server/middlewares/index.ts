import express from 'express';
import { get, merge } from 'lodash';

import { getUserBySessionToken } from '../models/users';

export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, 'identity._id');

    if (currentUserId === undefined) {
      return res.sendStatus(403);
    }

    if (!currentUserId) {
      return res.sendStatus(403);
    }

    if ((currentUserId as string).toString() !== id) {
      return res.sendStatus(403);
    }

    next();
    return;
  } catch (error) {
    return res.sendStatus(403);
  }
};

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies['CookieFamiGO'];
    if (!sessionToken) {
      res.sendStatus(403);
    }
    const existingUser = await getUserBySessionToken(sessionToken);
    if (!existingUser) {
      return res.sendStatus(403);
    }
    merge(req, { identity: existingUser });
    return next();
  } catch (error) {
    return res.sendStatus(400);
  }
};
