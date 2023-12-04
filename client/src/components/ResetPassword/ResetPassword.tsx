import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { resetPassword } from '../../services/auth';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password don't match");
      return;
    }

    // Parse token from URL
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');

    if (!token) {
      alert('Token is missing');
      return;
    }

    try {
      await resetPassword(token, password);
      navigate('/login');
    } catch (error) {
      console.error('Reset password failed', error);
    }
  };

  return (
    <div>
      <h1>New Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          placeholder="Create new password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          value={confirmPassword}
          placeholder="Confirm your password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
