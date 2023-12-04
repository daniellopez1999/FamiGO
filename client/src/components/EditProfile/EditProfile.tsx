import { useState, ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { updateUserInfo } from '../../services/users';
import { getUser } from '../../redux/userSlice';
import { UserInfoUpdate, IUser } from '../../types/user';

import './EditProfile.css';
import { uploadFileToCloudinary } from '../../services/apiCloudinary';
import { FileInfo } from '../../types/activity';

const EditProfile = () => {
  const navigate = useNavigate();
  const { handleUserInfoUpdate } = useAuth();

  const user = getUser();
  const { username, description } = user as IUser;
  let { avatar } = user as IUser;

  const [newUsername, setNewUsername] = useState('');
  const [presentation, setPresentation] = useState('');

  const [fileInfo, setFileInfo] = useState<FileInfo>({} as FileInfo);
  const [fileStatus, setFileStatus] = useState<null | string>(null);

  const [localAvatar, setLocalAvatar] = useState<string | null>(null);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (newPassword !== '' && newPassword === confirmNewPassword) {
        const updates: UserInfoUpdate = {
          newUsername,
          description: presentation,
          avatar: fileInfo.secureUrl,
          password: newPassword,
        };
        const res = await updateUserInfo(username, updates);
        await handleUserInfoUpdate(res);
      } else {
        const updates: UserInfoUpdate = {
          newUsername,
          description: presentation,
          avatar: fileInfo.secureUrl,
        };
        const res = await updateUserInfo(username, updates);
        await handleUserInfoUpdate(res);
      }

      if (newUsername) {
        navigate(`/profile/${newUsername}`);
      } else {
        navigate(`/profile/${username}`);
      }
    } catch (error) {
      console.error('Failed to update the profile', error);
    }
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      event.preventDefault();
      setFileStatus('loading');

      const file = event.target.files![0];
      const info = (await uploadFileToCloudinary(file)) as FileInfo;

      setFileInfo(info);

      avatar = info.secureUrl;

      setLocalAvatar(avatar);

      setFileStatus(null);
    } catch (error) {
      console.log('Upload file error!');
      setFileStatus('failed');
    }
  };

  useEffect(() => {
    setLocalAvatar(fileInfo.secureUrl);
  }, [fileInfo]);

  return (
    <div>
      <div className="editProfile-container">
        <form onSubmit={handleSubmit}>
          <div className="avatar">
            <label htmlFor="avatarInput">
              <img src={localAvatar || avatar} alt="avatar" />
            </label>
            <input
              type="file"
              id="avatarInput"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            placeholder={username}
            className="username-input"
          />
          <textarea
            value={presentation}
            onChange={(e) => setPresentation(e.target.value)}
            placeholder={description}
            className="presentation-textarea"
          ></textarea>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Current Password"
            className="password-input"
          />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            className="password-input"
          />
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            placeholder="Confirm New Password"
            className="password-input"
          />
          <button type="submit" className="update-btn">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
