import { useState } from 'react';
import { sendPasswordResetEmail } from '../../services/auth';

import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(email);
      setMessage(
        'If an account exists for this email, a reset link will be sent'
      );
    } catch (error) {
      console.error('Send password reset mail failed', error);
      setMessage('Failed to send reset email. Please try again');
    }
  };

  return (
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
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
