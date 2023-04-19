import React from 'react';
import styles from './LoginForm.module.scss';

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
  error: string | null; 
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, error }) => {
  const [stateEmail, setStateEmail] = React.useState('');
  const [statePassword, setStatePassword] = React.useState('');

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
      <input
        type="password"
        placeholder="Password"
        value={statePassword}
        onChange={(e) => setStatePassword(e.target.value)}
      />
      {error && <p className={styles.error}>{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;