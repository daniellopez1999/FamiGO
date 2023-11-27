import { useState } from 'react';
import { User } from '../types/user';

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
    e.preventDefault;

    if (inputValues.password != inputValues.confirmPassword) {
      console.error('Password is different than Confirm Password');
    } else {
      registerUser(inputValues).then(() => {
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
    <div>
      <div>RegisterPage</div>
    </div>
  );
};
export default RegisterPage;
