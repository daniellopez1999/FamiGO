import { Request, Response } from 'express';
import { getUserByUserName } from '../models/users';
import { getActivitiesByID } from '../models/activity';

export const saveActivityInProfile = async (req: Request, res: Response) => {
  try {
    const { id, username } = req.params;
    const user = await getUserByUserName(username);

    if (user && id) {
      //check if exists in array
      if (user.savedPosts?.includes(id)) {
        const indexToDelete = user.savedPosts.indexOf(id);
        user.savedPosts.splice(indexToDelete, 1);
        await user.save();
      } else {
        user.savedPosts ??= [];
        user.savedPosts.push(id);

        await user.save();
        res.status(201).end();
      }
    }
    return;
  } catch (error) {
    console.error('Error saving activity:', error);
    return res.sendStatus(400).send(error);
  }
};

export const likeActivity = async (req: Request, res: Response) => {
  try {
    const { id, username } = req.params;
    const user = await getUserByUserName(username);
    const activity = await getActivitiesByID(id);
    const userID = user?._id.toString();

    if (user && activity) {
      if (activity.likes?.includes(userID!)) {
        const indexToDelete = activity.likes.indexOf(userID!);
        activity.likes.splice(indexToDelete, 1);
        await activity.save();
      } else {
        activity.likes ??= [];
        activity.likes.push(userID!);

        await activity.save();
        res.status(201).end();
      }
    }
    return;
  } catch (error) {
    return res.status(403).end();
  }
};

export const checkLike = async (req: Request, res: Response) => {
  try {
    const { id, username } = req.params;
    const user = await getUserByUserName(username);
    const activity = await getActivitiesByID(id);
    const userID = user?._id.toString();

    if (user && activity) {
      if (activity.likes?.includes(userID!)) {
        return res.status(200).json({ value: true }).end();
      } else {
        return res.status(200).json({ value: false }).end();
      }
    }
    return;
  } catch (error) {
    return res.status(403).end();
  }
};
