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
      </form>
    </div>
  );
};

export default Login;
