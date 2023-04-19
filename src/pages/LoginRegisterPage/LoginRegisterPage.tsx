import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import './LoginRegisterPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../store/actions/auth';
import { RootState } from '../../store/reducers';

const LoginRegisterPage: React.FC = () => {
  const dispatch = useDispatch();
  const error = useSelector((state: RootState) => state.auth.error)
  const handleLogin = (email: string, password: string, twoFactorToken?: string) => {
    console.log('Logging in with', email, password, twoFactorToken);
    // Add your login logic here
    dispatch(userLogin({ email, password, twoFactorToken}));
  };

  const handleRegister = (email: string, password: string) => {
    console.log('Registering with', email, password);
    // Add your registration logic here
  };

  return (
    <div className="login-register-page">
      <LoginForm onLogin={handleLogin} error={error}/>
      <RegisterForm onRegister={handleRegister} />
    </div>
  );
};

export default LoginRegisterPage;