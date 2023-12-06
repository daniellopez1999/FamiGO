import React, { useState, useEffect } from 'react';
import { getFollowers } from '../../services/users';

interface Follower {
  username: string;
  avatar: string;
}

interface FollowersList {
  followers: Follower[];
}

interface FollowersProps {
  username: string;
}

const Followers: React.FC<FollowersProps> = ({ username }) => {
  const [followersList, setFollowersList] = useState<FollowersList>({
    followers: [],
  });

  useEffect(() => {
    async function getListOfFollowers() {
      try {
        const fetchedFollowers = await getFollowers(username);
        setFollowersList(fetchedFollowers);
      } catch (error) {
        console.error('Error fetching followers:', error);
      }
    }
    getListOfFollowers();
  }, [username]);

  console.log(followersList);

  return (
    <div>
      {followersList.followers.map((follower) => (
        <div key={follower.username}>
          <div>
            <img src={follower.avatar} />
          </div>
          <div>{follower.username}</div>
        </div>
      ))}
    </div>
  );
};

export default Followers;
