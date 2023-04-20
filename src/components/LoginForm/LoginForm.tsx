import React from 'react';
import styles from './LoginForm.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
  error: string | null; 
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, error }) => {
  const [stateEmail, setStateEmail] = React.useState('');
  const [statePassword, setStatePassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(stateEmail, statePassword);
  };
  const companyLogo = `${process.env.PUBLIC_URL}/assets/silicon-valley-logo.png`;

  return (
    <form className={styles.loginWrapper} onSubmit={handleSubmit}>
      <img className={styles.companyBrand} src={companyLogo} alt={'Company Logo'}></img> 
      <input className={styles.emailInput} type="email" placeholder="Email" value={stateEmail} onChange={(e) => setStateEmail(e.target.value)}/>
      <div className={styles.passwordInput}>
        <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={statePassword} onChange={(e) => setStatePassword(e.target.value)}/>
        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}/>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <button className={styles.loginButton} type="submit">Login</button>
    </form>
  );
};

export default LoginForm;