import { Request, Response } from 'express';
import { getUserByUserName } from '../models/users';
import { getActivitiesFromUser } from '../models/activity';
import { ActivityModel } from '../models/activity';
import {
  iterateIDs,
  getAllPostsIDs,
  iterateActivities,
  iterateActivitiesFromUser,
} from '../helpers/activity';

export const publishActivity = async (req: Request, res: Response) => {
  try {
    const activityBody = req.body;
    const username = req.cookies['username'];
    const user = await getUserByUserName(username);

    activityBody.userInfo.username = user!.username;

    const activity = await new ActivityModel(activityBody).save();

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

export const getUserData = async (_req: Request, res: Response) => {
  try {
    const user = res.locals.user;

    const username = user?.username;

    const activitiesFromUser = await getActivitiesFromUser(username);

    const listOfActivities = await iterateActivitiesFromUser(
      activitiesFromUser!.statistics!.posts!
    );
    res.json({ user: user, activities: listOfActivities }).status(200);
    return;
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

export const getPostsForFeed = async (req: Request, res: Response) => {
  try {
    const username = req.cookies['username'];
    const user = await getUserByUserName(username);
    const followingUserIDs = user!.statistics!.following!;

    if (followingUserIDs.length > 0) {
      //get post info of each user following

      const arrayWithUsers = await iterateIDs(followingUserIDs);

      //arrayWithUsers contains all users following.
      //iteratee over each object over postsIDs
      const postsIDs = getAllPostsIDs(arrayWithUsers);

      const arrayWithAllActivities = await iterateActivities(postsIDs);

      //Sort by createdAt
      const sortedArrayToName = arrayWithAllActivities.sort((a, b) => {
        const createdAtA = new Date(Object.values(a)[0].createdAt).getTime();
        const createdAtB = new Date(Object.values(b)[0].createdAt).getTime();

        return createdAtB - createdAtA;
      });

      res.json({ sortedArrayToName });
    }
    //if not following any users goes to else
    else {
      let limit = 20; //will only get 20 posts
      const randomActivities = await ActivityModel.aggregate([
        { $sample: { size: limit } },
      ]);

      res.json({ randomActivities }).status(200);
    }
    return;
  } catch (error) {
    return res.sendStatus(400);
  }
};

export const saveActivity = async (req: Request, res: Response) => {
  try {
    const savedActivityBody = req.body;

    // When we have users, we are going to add the userInfo and username to the savedActivity.
    // const username = req.cookies['username'];
    // const user = await getUserByUserName(username);
    // savedActivityBody.userInfo.username = user!.username;

    const activity = await new ActivityModel(savedActivityBody).save();
    return res.status(200).json(activity);
  } catch (error) {
    return res.sendStatus(400);
  }
};
