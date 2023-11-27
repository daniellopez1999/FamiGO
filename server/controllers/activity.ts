import { Request, Response } from 'express';
import { getUserByUserName } from '../models/users';
import { ActivityModel } from '../models/activity';

export const publishActivity = async (req: Request, res: Response) => {
  try {
    const activityBody = req.body;
    const username = req.cookies['username'];
    const user = await getUserByUserName(username);

    activityBody.userInfo.username = user!.username;

    const activity = await new ActivityModel(activityBody).save();
    res.json(activity).status(200);
    return;
  } catch (error) {
    return res.sendStatus(400);
  }
};
