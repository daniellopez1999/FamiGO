const BASE_URL = import.meta.env.VITE_BASE_URL;

import { Activity } from '../types/activity';

export const publishActivity = async (info: Activity) => {
  try {
    const activity = {
      ...info,
    };

    const url = `${BASE_URL}/publish-activity`;

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ activity }),
    });

    if (res.status !== 201) {
      throw 'published failed';
    }

    const data = await res.json();
    console.log('data returned -->', data);

    return data;
  } catch (error) {
    console.log('publish activity errrr -->', error);
    return;
  }
};

export const getActivity = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:3000/get-activity/${id}`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) console.error('ERROR');

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const saveActivityInProfile = async (
  username: string,
  activityID: string
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/savepost-in-user/${username}/${activityID}`,
      {
        method: 'POST',
      }
    );

    if (!response.ok) console.error('ERROR');

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const saveLike = async (username: string, activityID: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/saveLike/${username}/${activityID}`,
      {
        method: 'POST',
      }
    );

    if (!response.ok) console.error('ERROR');

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
