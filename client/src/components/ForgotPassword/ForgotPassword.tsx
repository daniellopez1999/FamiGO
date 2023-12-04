import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from '../../services/auth';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Todo: Send a request to server
    // ? await sendPasswordResetEmail(email);
    await sendPasswordResetEmail(email);

    navigate('/reset-pasword');
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          placeholder="Enter you email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Continue</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
