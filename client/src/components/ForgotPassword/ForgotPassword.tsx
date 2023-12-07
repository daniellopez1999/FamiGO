import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa6';
import { sendPasswordResetEmail } from '../../services/auth';
import toast from 'react-hot-toast';

import './ForgotPassword.css';

type Props = {
  onGoBackClick?: Function;
};

const ForgotPassword = ({ onGoBackClick }: Props) => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleClick = () => {
    if (onGoBackClick) {
      onGoBackClick();
    } else {
      navigate('/login');
    }
  };

  const iconStyle = { width: '100%', height: '100%', color: 'white' };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(email);
      toast('📩 Reset password link has been sent');
      setEmail('');
    } catch (error) {
      console.error('Send password reset mail failed', error);
      toast.error('Failed to send reset email. Please try again');
    }
  };

  return (
    <>
      <div className="header">
        <button className="btn-go-back" onClick={handleClick}>
          <FaChevronLeft style={iconStyle} />
        </button>
      </div>
      <div className="forgotPassword-container">
        <div className="forgot-password">
          <h2>Forgot Password</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            className="email-input"
          />
          <button type="submit" className="continue-btn">
            Continue
          </button>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
