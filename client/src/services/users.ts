const url = 'http://localhost:3000';

export const getUserInfo = async (username: string) => {
  try {
    const response = await fetch(`${url}/profile/${username}`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) console.error('ERROR');

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
