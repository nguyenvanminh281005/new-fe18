import React, { useState } from 'react';
import styles from '../../css/Auth.module.css';
import axios from 'axios';

const ForgotPassword = ({ onClose, onOpenLogin }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!email) {
      setErrorMsg('Vui lòng nhập email của bạn');
      return;
    }
  
    try {
      setIsLoading(true);
      setErrorMsg('');
      setMessage('');
  
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/forgot-password`, { email });
  
      setMessage(response.data.message || 'Email đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư của bạn.');
      setEmail('');
    } catch (error) {
      if (error.response) {
        setErrorMsg(error.response.data.error || 'Đã xảy ra lỗi từ server.');
      } else if (error.request) {
        setErrorMsg('Không nhận được phản hồi từ server.');
      } else {
        setErrorMsg('Lỗi khi gửi yêu cầu.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <h2>Quên mật khẩu</h2>
          <p>Nhập email của bạn để nhận link đặt lại mật khẩu</p>
        </div>

        {message && <div className={styles.successMessage}>{message}</div>}
        {errorMsg && <div className={styles.errorMessage}>{errorMsg}</div>}

        <form onSubmit={handleSubmit} className={styles.authForm}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email của bạn"
              required
              className={styles.input}
            />
          </div>

          <button
            type="submit"
            className={styles.authButton}
            disabled={isLoading}
          >
            {isLoading ? 'Đang xử lý...' : 'Gửi yêu cầu đặt lại mật khẩu'}
          </button>
        </form>

        <div className={styles.authFooter}>
          <p>
            <span
              onClick={() => onOpenLogin()}
              className={styles.linkLike}
              style={{ cursor: 'pointer', color: '#007bff', textDecoration: 'underline' }}
            >
              Quay lại đăng nhập
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;