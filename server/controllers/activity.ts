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
    console.log(user?.statistics?.posts);
    console.log(activity);
    const activityID = await ActivityModel.findById(activity._id);

    if (user && activityID) {
      user.statistics ??= {};
      user.statistics.posts ??= [];
      user.statistics.posts.push(activityID._id.toString());

      await user!.save();

      res.json(activity).status(200);
      return;
    }
    return;
  } catch (error) {
    return res.sendStatus(400);
  }
};
