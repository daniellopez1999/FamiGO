import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="login-container">
      <form action="">
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
