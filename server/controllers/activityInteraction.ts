import { Request, Response } from 'express';
import { getUserByUserName } from '../models/users';

export const saveActivityInProfile = async (req: Request, res: Response) => {
  try {
    console.log('a');
    const { id, username } = req.params;
    console.log(id, username);
    const user = await getUserByUserName(username);

    console.log(id, username);
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
