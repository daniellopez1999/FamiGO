import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getActivity } from '../../services/activity';
import { ActivityObject } from '../../types/activity';

const SpecificActivity = () => {
  const { id } = useParams();
  const [activityData, setActivityData] = useState<ActivityObject | null>(null);

  useEffect(() => {
    async function getActivityInfo() {
      const activity = await getActivity(id!);
      setActivityData(activity);
    }
    getActivityInfo();
  }, [id]);

  useEffect(() => {
    console.log(activityData);
  });

  return (
    <div>
      <img src={activityData?.activityInfo.image} />
    </div>
  );
};

export default SpecificActivity;
