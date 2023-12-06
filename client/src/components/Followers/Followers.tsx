import React, { useState, useEffect } from 'react';
import { getFollowers } from '../../services/users';
import { Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';

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

  const history = createBrowserHistory();

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
      <button className="button" onClick={() => history.back()}>
        {'<-'}
      </button>
      {followersList.followers.map((follower) => (
        <div className="info" key={follower.username}>
          <Link to={`/profile/${follower.username}`}>
            <div className="avatar">
              <img
                src={follower.avatar}
                alt={`${follower.username}'s avatar`}
              />
            </div>
            <p>{follower.username}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Followers;
