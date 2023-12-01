import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  getActivity,
  getLikes,
  saveActivityInProfile,
  saveLike,
} from '../../services/activity';
import { ActivityObject } from '../../types/activity';
import { getUserInfo } from '../../services/users';
import { UserInfo } from '../../types/user';
import { getUsername } from '../../redux/authSlice';
import Comment from '../Comment/Comment';
import CommentList from '../CommentList/CommentList';

const SpecificActivity = () => {
  const myUsername = getUsername();
  const { id } = useParams();
  const [activityData, setActivityData] = useState<ActivityObject | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [showActivityComments, setshowActivityComments] = useState(false);

  useEffect(() => {
    async function getActivityInfo() {
      const activity = await getActivity(id!);
      setActivityData(activity);
    }
    getActivityInfo();
  }, [id]);

  useEffect(() => {
    const username = activityData?.activityInfo.userInfo.username;
    async function getInfoFromUser() {
      const userData = await getUserInfo(username!);
      setUserInfo(userData);
    }
    getInfoFromUser();

    const checkLike = async () => {
      const liked = await checkIfLike();
      liked;
    };
    checkLike();
  }, [activityData]);

  function saveActivity() {
    const activityID = activityData!.activityInfo._id;
    saveActivityInProfile(myUsername!, activityID!);
  }

  async function like() {
    const activityID = activityData!.activityInfo._id;
    await saveLike(myUsername!, activityID!);
    const activity = await getActivity(id!);
    setActivityData(activity);
    await checkIfLike();
  }

  async function checkIfLike() {
    const activityID = activityData!.activityInfo._id;
    const checkIfActivityHasLike = await getLikes(myUsername!, activityID!);
    setIsLiked(checkIfActivityHasLike.value);
    return checkIfActivityHasLike.value;
  }

  const showAllComments = async () => {
    if (showActivityComments) {
      setshowActivityComments(false);
    } else {
      setshowActivityComments(true);
    }
  };

  return (
    <div className="feed-item">
      <div className="info">
        <div className="avatar">
          <img src={userInfo?.user.avatar} alt="avatar" />
        </div>
        <p>{activityData?.activityInfo.userInfo.username}</p>
      </div>
      <div className="content">
        <img src={activityData?.activityInfo.image} alt="activity image" />
      </div>
      <div className="status">
        <p>{activityData?.activityInfo.likes.length} likes</p>
        <div className="actions">
          <p>
            <button onClick={() => like()}>
              {' '}
              {isLiked ? 'Unlike' : 'Like'}
            </button>
          </p>
          <p>
            <button onClick={() => setShowComment((prev) => !prev)}>
              {showComment ? 'Hide' : 'Comment'}
            </button>
          </p>
          <p>
            <button onClick={() => saveActivity()}>save</button>
          </p>
        </div>
      </div>
      <p>{activityData?.activityInfo.description}</p>
      {showComment && (
        <Comment
          myUsername={myUsername}
          activityID={activityData?.activityInfo._id}
        />
      )}
      {showActivityComments && (
        <CommentList activityID={String(activityData?.activityInfo._id)} />
      )}
      <p>
        <button onClick={() => showAllComments()}>view all comments</button>
      </p>
    </div>
  );
};

export default SpecificActivity;
