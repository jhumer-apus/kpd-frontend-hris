import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import './LoginRegisterPage.scss';

const LoginRegisterPage: React.FC = () => {
  const handleLogin = (email: string, password: string) => {
    console.log('Logging in with', email, password);
    // Add your login logic here
  };

  const handleRegister = (email: string, password: string) => {
    console.log('Registering with', email, password);
    // Add your registration logic here
  };

  return (
    <div className="login-register-page">
      <LoginForm onLogin={handleLogin} />
      <RegisterForm onRegister={handleRegister} />
    </div>
  );
};

export default LoginRegisterPage;