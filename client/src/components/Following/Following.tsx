import React, { useState, useEffect } from 'react';
import { getFollowing } from '../../services/users';
import { Link } from 'react-router-dom';
import './Following.css';

interface Following {
  username: string;
  avatar: string;
}

interface FollowingList {
  following: Following[];
}

interface FollowingProps {
  username: string;
}

const Following: React.FC<FollowingProps> = ({ username }) => {
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
    <div>
      {followingList.following.map((following) => (
        <div className="follows" key={following.username}>
          <Link to={`/profile/${following.username}`} className="link-follow">
            <div className="picture">
              <img
                src={following.avatar}
                alt={`${following.username}'s avatar`}
              />
            </div>
            <p className="follow-name">{following.username}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Following;
