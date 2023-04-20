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

  return (
    <form className={styles.loginWrapper} onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={stateEmail}
        onChange={(e) => setStateEmail(e.target.value)}
      />
      {/* <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        value={statePassword}
        onChange={(e) => setStatePassword(e.target.value)}
      />
      <div>
        <input
          type="checkbox"
          id="showPassword"
          checked={showPassword}
          onChange={(e) => setShowPassword(e.target.checked)}
        />
        <label htmlFor="showPassword">Show Password</label>
      </div> */}
      <div className={styles.passwordInput}>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          value={statePassword}
          onChange={(e) => setStatePassword(e.target.value)}
        />
        <FontAwesomeIcon
          icon={showPassword ? faEyeSlash : faEye}
          className={styles.eyeIcon}
          onClick={() => setShowPassword(!showPassword)}
        />
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;