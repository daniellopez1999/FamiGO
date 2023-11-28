// helpers.ts
import { getActivitiesByID } from '../models/activity';
import { getUserById } from '../models/users';
import { UsersData } from '../types';

export async function iterateIDs(userIDs: string[]) {
  const arrayWithUsers: { [key: string]: any }[] = [];

  for (const userID of userIDs) {
    const User = await getUserById(userID);

    if (User !== null) {
      arrayWithUsers.push({ [userID]: User });
    }
  }

  return arrayWithUsers;
}

export function getAllPostsIDs(usersData: UsersData[]): string[] {
  let allPosts: string[] = [];

  usersData.forEach((user) => {
    const userId = Object.keys(user)[0];
    const userPosts = user[userId].statistics.posts;
    allPosts = allPosts.concat(userPosts);
  });

  return allPosts;
}

export async function iterateActivities(activities: string[]) {
  const arrayToName: { [key: string]: any }[] = [];

  for (const activityId of activities) {
    const activity = await getActivitiesByID(activityId);

    if (activity !== null) {
      arrayToName.push({ [activityId]: activity });
    }
  }

  return arrayToName;
}

export async function iterateActivitiesFromUser(activities: string[]) {
  const arrayToName: { [key: string]: any }[] = [];

  for (const activityId of activities) {
    const activity = await getActivitiesByID(activityId);

    if (activity !== null) {
      arrayToName.push({ [activityId]: activity });
    }
  }

  return arrayToName;
}
