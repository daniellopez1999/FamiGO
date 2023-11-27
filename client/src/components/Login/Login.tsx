import { useState } from 'react';
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
          className="auth"
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          className="auth"
          placeholder="Password"
          required
        />
        <button type="submit" className="submit-btn">
          LOG IN
        </button>
      </form>
      <div>
        <span>Don't have an account?</span>
        <button>SIGN UP</button>
      </div>
    </div>
  );
};

export default Login;
