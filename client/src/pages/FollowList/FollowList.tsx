import { useParams } from 'react-router-dom';
import Followers from './../../components/Followers/Followers';
import Following from '../../components/Following/Following';
import Header from '../../components/Header/Header';

const FollowList = () => {
  const { username } = useParams();

  const isFollowersPage = window.location.pathname.includes('followers');

  return (
    <div>
      {isFollowersPage ? (
        <>
          <Header title="Followers" />
          <Followers username={username!} />
        </>
      ) : (
        <>
          <Header title="Following" />
          <Following username={username!} />
        </>
      )}
    </div>
  );
};

export default FollowList;
