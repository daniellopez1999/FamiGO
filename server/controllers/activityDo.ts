import { Request, Response } from 'express';
import { getUserByUserName } from '../models/users';

export const saveActivityInProfile = async (req: Request, res: Response) => {
  try {
    console.log('aa');
    const savedActivityBody = req.params;
    console.log(savedActivityBody);
    const activityID = savedActivityBody.id;
    const username = savedActivityBody.username;

    const user = await getUserByUserName(username);

    console.log(activityID, username);
    if (user && activityID) {
      //check if exists in array
      if (user.savedPosts?.includes(activityID)) {
        const indexToDelete = user.savedPosts.indexOf(activityID);
        user.savedPosts.splice(indexToDelete, 1);
        await user.save();
      } else {
        user.savedPosts ??= [];
        user.savedPosts.push(activityID);

        await user.save();
        res.status(201);
      }
    }
    return;
  } catch (error) {
    console.error('Error saving activity:', error);
    return res.sendStatus(400).send(error);
  }
};
