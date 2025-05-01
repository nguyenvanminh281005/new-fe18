import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext/AuthContext';
import styles from '../../../css/Home.module.css';

const Header = ({ onOpenPopup }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/home');
  };

  return (
    <header className={styles.homeHeader}>
      <h1>Parkinson's Disease Prediction</h1>
      <div className={styles.authButtons}>
        {!currentUser ? (
          <>
            <button onClick={() => onOpenPopup('login')} className={styles.btnPrimary}>Đăng nhập</button>
            <button onClick={() => onOpenPopup('register')} className={styles.btnSecondary}>Đăng ký</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate('/profile')} className={styles.btnPrimary}>Profile</button>
            <button className={styles.btnSecondary} onClick={handleLogout}>Log Out</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
