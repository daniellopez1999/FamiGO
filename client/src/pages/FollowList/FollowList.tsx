import { useParams } from 'react-router-dom';
import Followers from './../../components/Followers/Followers';
import Following from '../../components/Following/Following';

const FollowList = () => {
  const { username } = useParams();

  const isFollowersPage = window.location.pathname.includes('followers');

  return (
    <div>
      {isFollowersPage ? (
        <Followers username={username!} />
      ) : (
        <Following username={username!} />
      )}
    </div>
  );
};

export default FollowList;
