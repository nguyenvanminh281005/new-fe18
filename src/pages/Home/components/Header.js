import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext/AuthContext';
import styles from '../../../css/Home.module.css';

const Header = ({ openPopup }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/home');
  };

  return (
    <header className={styles.homeHeader}>
      <h1>Ứng dụng dự đoán xét nghiệm bệnh Pakinson</h1>
      <div className={styles.authButtons}>
        {!currentUser ? (
          <>
            <button onClick={() => openPopup('login')} className={styles.btnPrimary}>Đăng nhập</button>
            <button onClick={() => openPopup('register')} className={styles.btnSecondary}>Đăng ký</button>
          </>
        ) : (
          <div className={styles.authButtons}>
            {/* Khi bấm Profile, gọi openPopup với 'profile' */}
            <button onClick={() => openPopup('profile')} className={styles.btnPrimary}>Trang cá nhân</button>
            <button className={styles.btnSecondary} onClick={handleLogout}>Đăng xuất</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;