import { Request, Response } from 'express';
import { getUserById, getUserByUserName } from '../models/users';
import { getActivitiesByID, getActivitiesFromUser } from '../models/activity';
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

export const getUserData = async (_req: Request, res: Response) => {
  try {
    const user = res.locals.user;

    const username = user?.username;

    const activitiesFromUser = await getActivitiesFromUser(username);

    const arrayToName: { [key: string]: any }[] = [];

    async function iterateActivities(activities: string[]) {
      for (const activityId of activities) {
        const activity = await getActivitiesByID(activityId);

        if (activity !== null) {
          arrayToName.push({ [activityId]: activity });
        }
      }
    }

    await iterateActivities(activitiesFromUser!.statistics!.posts!);
    res.json({ user: user, activities: arrayToName }).status(200);
    return;
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

export const getPostsFromFeed = async (req: Request, res: Response) => {
  try {
    const username = req.cookies['username'];
    const user = await getUserByUserName(username);
    console.log(user);
    const userFollowingIDs = user!.statistics!.following!;
    //if following >0
    if (userFollowingIDs) {
      console.log('hola');
      console.log('Following IDs', userFollowingIDs);
      //get post info of each user following
      const arrayWithUsers: { [key: string]: any }[] = [];

      async function iterateIDs(userIDs: string[]) {
        for (const userID of userIDs) {
          const User = await getUserById(userID);

          if (User !== null) {
            arrayWithUsers.push({ [userID]: User });
          }
        }
      }

      await iterateIDs(userFollowingIDs);
      console.log(arrayWithUsers);
      res.json({ arrayWithUsers });
      //sort by createdAt
    }
  } catch (error) {}
};
