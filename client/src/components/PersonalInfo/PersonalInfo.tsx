import { Link } from 'react-router-dom';
import DataBox from '../DataBox/DataBox';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserInfo } from '../../services/users';
import { UserInfo } from '../../types/user';
import { followAndUnfollow } from '../../services/users';
import { getMyUsername } from '../../redux/userSlice';
import { checkFollowing } from '../../services/users';

import './PersonalInfo.css';

const PersonalInfo = () => {
  const myUsername = getMyUsername();

  const { username } = useParams();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);

  async function checkIfFollows() {
    const following = await checkFollowing(
      myUsername!,
      userInfo?.user.username!
    );
    setIsFollowing(following.following);
  }

  useEffect(() => {
    async function getInfoFromUser() {
      const userData = await getUserInfo(username!);
      setUserInfo(userData);
    }
    getInfoFromUser();
  }, [username]);

  useEffect(() => {
    checkIfFollows();
  }, [myUsername, userInfo?.user.username]);

  const follow = async () => {
    console.log('follow');
    const followData = await followAndUnfollow(
      userInfo?.user.username!,
      myUsername!
    );
    console.log(followData);
    checkIfFollows();
  };

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
          <p className="desc">{userInfo?.user.description}</p>
          <Link to={`/edit-profile/${username}`}>
            <button className="edit-btn">Edit profile</button>
          </Link>
          <button onClick={() => follow()}>
            {isFollowing ? 'Unfollow' : 'Follow'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
