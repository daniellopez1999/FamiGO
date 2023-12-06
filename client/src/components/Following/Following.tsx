import React, { useState, useEffect } from 'react';
import { getFollowing } from '../../services/users';
import { Link, useNavigate } from 'react-router-dom';
import './Following.css';
import { FaChevronLeft } from 'react-icons/fa6';

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

  const navigate = useNavigate();

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
    <div className="specific-item ">
      <button className="btn-go-back-following" onClick={() => navigate(-1)}>
        <FaChevronLeft className="iconStyle" />
      </button>
      {followingList.following.map((following) => (
        <div className="info" key={following.username}>
          <Link to={`/profile/${following.username}`}>
            <div className="avatar">
              <img
                src={following.avatar}
                alt={`${following.username}'s avatar`}
              />
            </div>
            <p>{following.username}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Following;
