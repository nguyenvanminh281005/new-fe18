import React, { useState } from 'react';
import styles from '../../css/Auth.module.css';

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

      // Giả lập API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setMessage('Email đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư của bạn.');
      setEmail('');
    } catch (error) {
      setErrorMsg('Đã xảy ra lỗi. Vui lòng thử lại sau.');
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