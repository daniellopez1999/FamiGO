import React, { useState, useEffect } from 'react';
import { getFollowers } from '../../services/users';
import { Link, useNavigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa6';

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

  const navigate = useNavigate();

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
  const iconStyle = { width: '100%', height: '100%', color: 'white' };

  return (
    <div className="specific-item">
      <button className="btn-go-back-following" onClick={() => navigate(-1)}>
        <FaChevronLeft className="iconStyle" />
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
