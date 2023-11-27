import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="login-container">
      <form action="">
        <input type="email" value={email} placeholder="Email" required />
        <input
          type="password"
          value={password}
          placeholder="Password"
          required
        />
        <button type="submit">LOG IN</button>
      </form>
      <div>
        <span>Don't have an account?</span>
        <button>SIGN UP</button>
      </div>
    </div>
  );
};

export default Login;
