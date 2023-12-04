import { useState, ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { updateUserInfo } from '../../services/users';
import { getUser } from '../../redux/userSlice';
import { UserInfoUpdate, IUser } from '../../types/user';

import './EditProfile.css';
import { uploadFileToCloudinary } from '../../services/apiCloudinary';
import { FileInfo } from '../../types/activity';

import { toast as showHotToast } from 'react-hot-toast';

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

  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let didMatch = true;

      if (newPassword !== '' && newPassword === confirmNewPassword) {
        const updates: UserInfoUpdate = {
          newUsername,
          description: presentation,
          avatar: fileInfo.secureUrl,
          password: newPassword,
        };
        const res = await updateUserInfo(username, updates);
        await handleUserInfoUpdate(res);
        toast('Password updated successfully', { icon: 'success' });
      } else if (newPassword !== '' && newPassword !== confirmNewPassword) {
        toast('Passwords do not match', { icon: 'error' });
        didMatch = false;
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
        if (didMatch) {
          navigate(`/profile/${newUsername}`);
        }
      } else {
        if (didMatch) {
          navigate(`/profile/${username}`);
        }
      }
    } catch (error) {
      console.error('Failed to update the profile', error);
      toast('Passwords do not match', { icon: 'error' });
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
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            className="username-input"
          />
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            placeholder="Confirm New Password"
            className="username-input"
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
function toast(message: string, options: { icon: string }) {
  showHotToast(message, { icon: options.icon });
}
