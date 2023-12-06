import React, { useState, useEffect } from 'react';
import { getFollowing } from '../../services/users';

interface Following {
  username: string;
  avatar: string;
}

interface FollowingList {
  following: Following[];
}

interface FollowersProps {
  username: string;
}

const Followers: React.FC<FollowersProps> = ({ username }) => {
  const [followingList, setFollowingList] = useState<FollowingList>({
    following: [],
  });

  useEffect(() => {
    async function getListOfFollowing() {
      try {
        const fetchedFollowing = await getFollowing(username);
        setFollowingList(fetchedFollowing);
      } catch (error) {
        console.error('Error fetching followers:', error);
      }
    }
    getListOfFollowing();
  }, [username]);

  return (
    <div className="specific-item">
      {followingList.following.map((following) => (
        <div className="info" key={following.username}>
          <div className="avatar">
            <img src={following.avatar} />
          </div>
          <p>{following.username}</p>
        </div>
      ))}
    </div>
  );
};

export default Followers;
