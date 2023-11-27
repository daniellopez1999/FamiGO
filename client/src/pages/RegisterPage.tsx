import { useState } from 'react';
import { User } from '../types/user';
import { register } from '../services/auth';

const RegisterPage = () => {
  interface FormState {
    inputValues: User;
  }

  const [inputValues, setInputValues] = useState<FormState['inputValues']>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputValues.password != inputValues.confirmPassword) {
      console.log('Password is different than Confirm Password');
    } else {
      register(
        inputValues.username,
        inputValues.email,
        inputValues.password
      ).then(() => {
        setInputValues({
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <input
              type="text"
              required={true}
              placeholder="Name"
              value={inputValues.username}
              onChange={handleChange}
              name="username"
            />
          </div>

          <div>
            <input
              type="text"
              required={true}
              placeholder="Email"
              value={inputValues.email}
              onChange={handleChange}
              name="email"
            />
          </div>

          <div>
            <input
              type="password"
              required={true}
              placeholder="Password"
              value={inputValues.password}
              onChange={handleChange}
              name="password"
            />
          </div>

          <div>
            <input
              type="password"
              required={true}
              placeholder="Confirm password"
              value={inputValues.confirmPassword}
              onChange={handleChange}
              name="confirmPassword"
            />
          </div>
        </div>
        <input type="submit" value="SIGN UP" />
      </form>
    </>
  );
};
export default RegisterPage;
