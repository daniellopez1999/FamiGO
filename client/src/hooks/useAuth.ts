import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../redux/hooks';
import { login, googleLogin } from '../services/auth';
import { getUserPlainInfo } from '../services/users';
import { getUser, setUser } from '../redux/userSlice';

import { UserLogin, IUser } from '../types/user';

const useAuth = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['app-username']);
  const dispatch = useAppDispatch();
  const user = getUser();

  const handleLogin = async (info: UserLogin) => {
    try {
      const user = (await login(info)) as IUser;

      // save user info in redux
      if (user) {
        dispatch(setUser(user));
        setCookie('app-username', user.username);
        return;
      }

      return;
    } catch (error) {
      console.log('login error - useAuth -->', error);
      throw new Error('login fail');
    }
  };

  const handleGoogleLogin = async (credential: string) => {
    try {
      const { user } = await googleLogin(credential);
      if (user) {
        dispatch(setUser(user));
        setCookie('app-username', user.username);
        return;
      }
      return;
    } catch (error) {
      console.error('Google login error - useAuth -->', error);
      throw error;
    }
  };

  const handleRegister = () => {};

  const handleAuthCheck = () => {
    const name = cookies['app-username'];
    if (!name) {
      navigate('/login');
    } else {
      navigate('/feed');
    }
    return;
  };

  const handleUserInfo = async () => {
    try {
      const name = cookies['app-username'];
      if (!name) {
        console.error('Username is undefined');
        return;
      }
      const res = await getUserPlainInfo(name);

      dispatch(setUser(res));
    } catch (error) {
      console.log('handle user info use auth hook err -->', error);
    }
  };

  const handleUserInfoUpdate = async (user: IUser) => {
    try {
      const { username } = user;
      setCookie('app-username', username);

      const res = await getUserPlainInfo(username);

      dispatch(setUser(res));
    } catch (error) {
      console.log('handle user info update use auth hook err -->', error);
      throw error;
    }
  };

  return {
    user,
    handleLogin,
    handleGoogleLogin,
    handleRegister,
    handleAuthCheck,
    handleUserInfo,
    handleUserInfoUpdate,
  };
};

export default useAuth;
