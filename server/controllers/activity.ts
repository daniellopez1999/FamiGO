import { Request, Response } from 'express';
import { getUserById, getUserByUserName } from '../models/users';
import { getActivitiesByID, getActivitiesFromUser } from '../models/activity';
import { ActivityModel } from '../models/activity';
import { UsersData } from '../types';

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
    const userFollowingIDs = user!.statistics!.following!;

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

      //arrayWithUsers contains all users following.
      //iteratee over each object over postsIDs
      function getAllPostsIDs(usersData: UsersData[]): string[] {
        let allPosts: string[] = [];

        usersData.forEach((user) => {
          const userId = Object.keys(user)[0];
          const userPosts = user[userId].statistics.posts;
          allPosts = allPosts.concat(userPosts);
        });

        return allPosts;
      }

      const postsIDs = getAllPostsIDs(arrayWithUsers);

      const arrayToName: { [key: string]: any }[] = [];

      async function iterateActivities(activities: string[]) {
        for (const activityId of activities) {
          const activity = await getActivitiesByID(activityId);

          if (activity !== null) {
            arrayToName.push({ [activityId]: activity });
          }
        }
      }

      await iterateActivities(postsIDs);
      res.json({ arrayToName });

      //sort by createdAt
    }
  } catch (error) {}
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
