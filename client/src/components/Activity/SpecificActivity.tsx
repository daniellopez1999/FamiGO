import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  getActivity,
  getLikes,
  deleteActivity,
  saveLike,
} from '../../services/activity';
import { ActivityObject } from '../../types/activity';
import { getUserInfo } from '../../services/users';
import { UserInfo } from '../../types/user';
import { getMyUsername } from '../../redux/userSlice';
import Comment from '../Comment/Comment';
import CommentList from '../CommentList/CommentList';
import FilterTag from '../FilterTag/FilterTag';
import './SpecificActivity.css';

const SpecificActivity = () => {
  const myUsername = getMyUsername();
  const { id } = useParams();
  const [activityData, setActivityData] = useState<ActivityObject | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [showComment, setShowComment] = useState(false);
  const [showActivityComments, setshowActivityComments] = useState(true);
  const [refreshComments, setRefreshComments] = useState(0);
  const [isMyActivity, setIsMyActivity] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function getActivityInfo() {
      const activity = await getActivity(id!);
      setActivityData(activity);
    }
    getActivityInfo();
  }, [id]);

  useEffect(() => {
    const username = activityData?.activityInfo.userInfo.username;

    if (activityData) {
      async function getInfoFromUser() {
        const userData = await getUserInfo(username!);
        setUserInfo(userData);
        if (activityData?.activityInfo.userInfo.username == myUsername) {
          setIsMyActivity(true);
        }
      }
      getInfoFromUser();

      const checkLike = async () => {
        const liked = await checkIfLike();
        liked;
      };
      checkLike();
    }
  }, [activityData]);

  async function checkIfLike() {
    const activityID = activityData!.activityInfo._id;
    const checkIfActivityHasLike = await getLikes(myUsername!, activityID!);
    setIsLiked(checkIfActivityHasLike.value);
    return checkIfActivityHasLike.value;
  }

  async function like() {
    const activityID = activityData!.activityInfo._id;
    await saveLike(myUsername!, activityID!);
    const activity = await getActivity(id!);
    setActivityData(activity);
    await checkIfLike();
  }

  async function deletePost() {
    const activityID = activityData!.activityInfo._id;
    await deleteActivity(myUsername!, activityID!);
    navigate(`/profile/${myUsername}`);
  }

  const handleCommentSubmitted = () => {
    setShowComment(false);
  };

  const filterEntries = Object.entries(
    activityData?.activityInfo.filters || {}
  );

  return (
    <div className="feed-item">
      <h2>{activityData?.activityInfo.title}</h2>
      <br />
      <div className="info">
        <div className="avatar">
          <img src={userInfo?.user.avatar} alt="avatar" />
        </div>
        <p>{activityData?.activityInfo.userInfo.username}</p>
      </div>
      <div className="filters">
        {filterEntries.map(([label, value]) => (
          <FilterTag key={label} label={label} value={value} />
        ))}
      </div>
      <div className="content">
        {activityData?.activityInfo.image && (
          <img src={activityData?.activityInfo.image} alt="activity image" />
        )}
      </div>
      <div className="status">
        <p>{activityData?.activityInfo.likes.length} likes</p>
        <button
          className={`button ${isLiked ? 'button-grey' : ''}`}
          onClick={() => like()}
        >
          {isLiked ? 'Unlike' : 'Like'}
        </button>
      </div>

      <p>{activityData?.activityInfo.description}</p>
      <div className="actions">
        <p>
          <button
            className={`button ${showComment ? 'button-grey' : ''}`}
            onClick={() => setShowComment((prev) => !prev)}
          >
            {showComment ? 'Hide' : 'Add a comment'}
          </button>
        </p>
      </div>
      <div className="delete">
        {isMyActivity && (
          <button className="button" onClick={() => deletePost()}>
            Delete post
          </button>
        )}
      </div>
      {showComment && (
        <Comment
          myUsername={myUsername!}
          activityID={activityData?.activityInfo._id!}
          onCommentSubmitted={() => {
            handleCommentSubmitted();
            setRefreshComments((prev) => prev + 1);
          }}
        />
      )}
      <div className="button-hide-all">
        <button
          className={`button ${showActivityComments ? '' : 'button-grey'}`}
          onClick={() => setshowActivityComments((prev) => !prev)}
        >
          {showActivityComments ? 'Hide all comments' : 'Show all comments'}
        </button>
      </div>
      {showActivityComments && (
        <CommentList
          activityID={String(activityData?.activityInfo._id)}
          refresh={refreshComments}
        />
      )}
    </div>
  );
};

export default SpecificActivity;
