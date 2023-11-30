import { useState } from 'react';
import Logo from '../../assets/logo.png';

import './EditProfile.css';

const tempImg = Logo;

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
};

const EditProfile = () => {
  const [username, setUsername] = useState('');
  const [presentation, setPresentation] = useState('');
  return (
    <div>
      <div className="editProfile-container">
        <div className="avatar">
          <img src={tempImg} alt="avatar" />
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
