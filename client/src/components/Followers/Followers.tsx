import React, { useState, useEffect } from 'react';
import { getFollowers } from '../../services/users';
import { Link } from 'react-router-dom';

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

  return (
    <div className="specific-item">
      {followersList.followers.map((follower) => (
        <div className="info" key={follower.username}>
          <Link to={`/profile/${follower.username}`} className="link-follow">
            <div className="avatar">
              <img
                src={follower.avatar}
                alt={`${follower.username}'s avatar`}
              />
            </div>
            <p className="follow-name">{follower.username}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Followers;
