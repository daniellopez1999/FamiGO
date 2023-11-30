const url = 'http://localhost:3000';

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(`${url}/login`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
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

export const googleLogin = async (credential: string) => {
  try {
    const response = await fetch(`${url}/login/google`, {
      method: 'POST',
      // mode: 'cors',
      // credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: credential }),
    });

    if (!response.ok) {
      throw new Error('Google login failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Google login error', error);
    throw error;
  }
};

export const registerPOST = async (
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

export const checkAuthentication = async () => {
  try {
    const response = await fetch(`${url}/api/check-auth`, {
      method: 'GET',
      credentials: 'include',
    });

    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};