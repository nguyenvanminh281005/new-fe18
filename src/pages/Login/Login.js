import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext';
import styles from '../../css/Auth.module.css';

function Login({ onClose, onOpenRegister, onOpenForgot }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    if (!email || !password) {
      setErrorMsg('Please fill in all fields.');
      setIsLoading(false);
      return;
    }

    try {
      console.log("🔍 Gửi request đăng nhập...");
      console.log("🔍 Dữ liệu gửi đi:", { email, password });

      const userData = await login(email, password);
      console.log("📌 Đăng nhập thành công:", userData);

      if (onClose) onClose();
      navigate('/home');
    } catch (err) {
      console.error("❌ Lỗi đăng nhập:", err);
      setErrorMsg(err.message || error || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <h2>Welcome Back</h2>
          <p>Log in to your Parkinson's Prediction account</p>
        </div>

        {errorMsg && <div className={styles.errorMessage}>{errorMsg}</div>}

        <form onSubmit={handleSubmit} className={styles.authForm}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className={styles.input}
            />
          </div>

          <div className={styles.forgotPassword}>
            <span
              onClick={() => {
                if(onOpenForgot) onOpenForgot();
              }}
              style={{ cursor: 'pointer', color: '#007bff', textDecoration: 'underline' }}
            >
              Forgot Password?
            </span>
          </div>

          <button 
            type="submit" 
            className={styles.authButton}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <div className={styles.authFooter}>
          <p>
            Don't have an account?{' '}
            <span
              onClick={onOpenRegister}
              className={styles.linkLike}
              style={{ cursor: 'pointer', color: '#007bff', textDecoration: 'underline' }}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;