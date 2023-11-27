const url = 'http://localhost:3000';

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(`${url}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // credentials: 'include',
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Login error', error);
    throw error;
  }
};

export const register = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const response = await fetch(`${url}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        email,
      }),
    });

    if (!response.ok) {
      console.error('Register failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
