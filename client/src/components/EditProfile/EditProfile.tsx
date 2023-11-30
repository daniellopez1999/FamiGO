import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUserInfo } from '../../services/users';
import Logo from '../../assets/logo.png';

import './EditProfile.css';

type EditProfileProps = {
  username: string;
};

const EditProfile = ({ username: currentUsername }: EditProfileProps) => {
  const [newUsername, setNewUsername] = useState('');
  const [presentation, setPresentation] = useState('');
  const [avatar] = useState(Logo);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateUserInfo(currentUsername, {
        newUsername: newUsername,
        description: presentation,
        avatar,
      });
      navigate(`/profile/${newUsername}`);
    } catch (error) {
      console.error('Failed to update the profile', error);
    }
  };

  return (
    <div>
      <div className="editProfile-container">
        <div className="avatar">
          <img src={avatar} alt="avatar" />
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            placeholder="User Name"
            className="username-input"
          />
          <textarea
            value={presentation}
            onChange={(e) => setPresentation(e.target.value)}
            placeholder="Presentation"
            className="presentation-textarea"
          ></textarea>
          <button type="submit" className="update-btn">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
