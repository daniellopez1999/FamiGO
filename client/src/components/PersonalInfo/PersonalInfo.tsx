import DataBox from '../DataBox/DataBox';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserInfo } from '../../services/users';
import { UserInfo } from '../../types/user';

import './PersonalInfo.css';

const PersonalInfo = () => {
  const { username } = useParams();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    async function getInfoFromUser() {
      const userData = await getUserInfo(username!);
      setUserInfo(userData);
    }
    getInfoFromUser();
  }, [username]);

  return (
    <div>
      <div className="personal-info">
        <div className="upper">
          <div className="avatar">
            <img src={userInfo?.user.avatar} alt="avatar" />
          </div>
          <div className="statistics">
            <DataBox
              type="Posts"
              number={userInfo?.user.statistics.posts.length ?? 0}
            />
            <DataBox
              type="Followers"
              number={userInfo?.user.statistics.followers.length ?? 0}
            />
            <DataBox
              type="Following"
              number={userInfo?.user.statistics.following.length ?? 0}
            />
          </div>
        </div>
        <div className="lower">
          <p className="name">{userInfo?.user.username}</p>
          <div className="desc">{userInfo?.user.description}</div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
