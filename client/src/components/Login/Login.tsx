import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../services/auth';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      navigate('/'); // después de login va al FeedPage
      console.log('Logged', user);
    } catch (error) {
      console.error('Login failed');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="auth"
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth"
          placeholder="Password"
          required
        />
        <button type="submit" className="login-btn">
          LOG IN
        </button>
      </form>
      <div>
        <span>Don't have an account?</span>
        <Link to="/register" className="signup-btn">
          SIGN UP
        </Link>
      </div>
    </div>
  );
};

export default Login;
