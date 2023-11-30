import './Collection.css';
import { UserInfo } from '../../types/user';
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserInfo } from '../../services/users';
import { getActivity } from '../../services/activity';

type Props = {
  type: string;
};

const Collection = ({ type }: Props) => {
  const { username } = useParams();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    async function getInfoFromUser() {
      console.log(username);
      const userData = await getUserInfo(username!);
      setUserInfo(userData);
    }
    getInfoFromUser();
  }, [username]);

  const handleImageClick = async (activityId: string) => {
    const activityData = await getActivity(activityId);
    console.log(activityData);
  };

  // todo: extract component for pre-view
  if (type === 'ai') {
    return (
      <div className="collection-ai">
        <div className="pre-view">
          <h3>title</h3>
          <p>do you want to build a snow man?</p>
          <p>duration: 1 hour </p>
        </div>
        <div className="pre-view">
          <h3>title</h3>
          <p>do you want to build a fire man?</p>
          <p>duration: 2 hour </p>
        </div>
      </div>
    );
  }

  return (
    <div className="collection">
      {userInfo?.activities.map((activityObj) => {
        const [activityId, activity] = Object.entries(activityObj)[0];

        return (
          <Link
            key={activityId}
            to={`/activity/${activityId}`}
            onClick={() => handleImageClick(activityId)}
          >
            <div className="pre-view">
              <img className="img" src={activity.image} alt={activity.title} />
            </div>
          </Link>
        );
      })}
    </div>
  );
};
export default Collection;
