import EditProfile from '../components/EditProfile/EditProfile';
import Header from '../components/Header/Header';
import { useParams } from 'react-router-dom';

const EditProfilePage = () => {
  const { username } = useParams<{ username: string }>();

  return (
    <div>
      <Header title="Edit Profile" />
      {username ? (
        <EditProfile username={username} />
      ) : (
        <p>Username not found</p>
      )}
    </div>
  );
};

export default EditProfilePage;
