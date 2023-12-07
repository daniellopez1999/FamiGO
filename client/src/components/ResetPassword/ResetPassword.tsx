import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa6';
import { resetPassword } from '../../services/auth';
import './ResetPassword.css';

type Props = {
  onGoBackClick?: Function;
};

const ResetPassword = ({ onGoBackClick }: Props) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (onGoBackClick) {
      onGoBackClick();
    } else {
      navigate('/forgot-password');
    }
  };

  const iconStyle = { width: '100%', height: '100%', color: 'white' };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
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
      alert('Failed to reset password. Please try again.');
    }
  };

  return (
    <>
      <div className="header">
        <button className="btn-go-back" onClick={handleClick}>
          <FaChevronLeft style={iconStyle} />
        </button>
      </div>
      <div className="resetPassword-container">
        <div className="reset-password">
          <h2>New Password</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            placeholder="Create new password"
            onChange={(e) => setPassword(e.target.value)}
            className="reset-input"
          />
          <input
            type="password"
            value={confirmPassword}
            placeholder="Confirm your password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="reset-input"
          />
          <button type="submit" className="reset-btn">
            Reset Password
          </button>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
