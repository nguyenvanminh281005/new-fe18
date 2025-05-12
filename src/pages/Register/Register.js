import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext';
import styles from '../../css/Auth.module.css';

function Register({ onClose, onOpenLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register, mockRegister, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);
  
    try {
      // Validate form fields
      if (!name || !email || !password || !confirmPassword) {
        setErrorMsg('Thiếu thông tin đăng ký');
        setIsLoading(false);
        return;
      }
  
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        setErrorMsg('Email không hợp lệ');
        setIsLoading(false);
        return;
      }
  
      if (password !== confirmPassword) {
        setErrorMsg('Mật khẩu không khớp');
        setIsLoading(false);
        return;
      }
  
      if (password.length < 6) {
        setErrorMsg('Mật khẩu phải có ít nhất 6 ký tự');
        setIsLoading(false);
        return;
      }
  
      console.log('Đang gửi request đăng ký...');
      
      // Sử dụng hàm register từ AuthContext thay vì tự gửi request
      const userData = await register(name, email, password);
      console.log('Đăng ký thành công:', userData);
  
      if (onClose) onClose();

      // Chuyển hướng đến trang dashboard
      navigate('/home');

    } catch (err) {
      console.error('Lỗi:', err);
      setErrorMsg(err.message || error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <h2>Tạo tài khoản</h2>
          <p>Đăng ký tài khoản cho website của bạn</p>
        </div>

        {errorMsg && <div className={styles.errorMessage}>{errorMsg}</div>}

        <form onSubmit={handleSubmit} className={styles.authForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Tên đầy đủ của bạn</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tên bạn là"
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Địa chỉ email</label>
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

          <div className={styles.formGroup}>
            <label htmlFor="password">Mật khẩu</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu của bạn"
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Xác minh mật khẩu</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Xác minh mật khẩu"
              required
              className={styles.input}
            />
          </div>

          <button 
            type="submit" 
            className={styles.authButton}
            disabled={isLoading}
          >
            {isLoading ? 'Đang đăng ký...' : 'Tạo tài khoản'}
          </button>
        </form>

        <div className={styles.authFooter}>
          <p>           
            Bạn đã có tài khoản?
            <span
              onClick={onOpenLogin}
              className={styles.linkLike}
              style={{ cursor: 'pointer', color: '#007bff', textDecoration: 'underline' }}
            >
              Đăng nhập
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;