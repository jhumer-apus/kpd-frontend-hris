// import React from 'react';
// import RegisterForm from '../../components/RegisterForm/RegisterForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import './LoginRegisterPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../store/actions/auth';
import { RootState } from '../../store/reducers';
import style from './LoginRegisterPage.module.scss';
import {  ReactComponent as LoginGirlSvg } from '../../special_assets/log-in-girl2.svg';
import '../../special_assets/log-in-girl2.css';

const LoginRegisterPage: React.FC = () => {
  const dispatch = useDispatch();
  const error = useSelector((state: RootState) => state.auth.error)
  const handleLogin = (email: string, password: string, twoFactorToken?: string) => {
    console.log('Logging in with', email, password, twoFactorToken);
    // Add your login logic here
    dispatch(userLogin({ email, password, twoFactorToken}));
  };

  // const handleRegister = (email: string, password: string) => {
  //   console.log('Registering with', email, password);
  //   // Add your registration logic here
  // };

  return (
    <main className={style.loginRegisterPage}>
      <section className={style.loginGirlWrap}> 
        <LoginGirlSvg />
      </section>
      <section className={style.loginFormWrap}>
        <LoginForm onLogin={handleLogin} error={error}/>
      </section>
      {/* <RegisterForm onRegister={handleRegister} /> */}
    </main>
  );
};

export default LoginRegisterPage;