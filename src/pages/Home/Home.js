import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext';
import styles from '../../css/Home.module.css';
import Login from '../Login/Login';
import Register from '../Register/Register';
import HomeContent from './components/HomeContent';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import Footer from './components/Footer';
import ProfilePopup from '../Profile/ProfilePopup';

const SimpleAbout = ({ currentUser, onOpenPopup }) => {
  return (
    <div className={styles.simpleAbout}>
      <div className={styles.ctaSection}>
        <Link to="/about" className={styles.btnPrimary}>Tìm hiểu thêm</Link>
        {currentUser ? (
          <Link to="/dashboard" className={styles.btnSecondary}>Dự đoán ngay</Link>
        ) : (
          <button onClick={() => onOpenPopup('login')} className={styles.btnSecondary}>Dự đoán ngay</button>
        )}
      </div>
    </div>
  );
};


function Home() {
  const { currentUser, logout } = useAuth();
  const [showPopup, setShowPopup] = useState(false);
  const [authType, setAuthType] = useState('login');
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/home');
  };

  const openPopup = (type) => {
    setAuthType(type);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className={styles.homeContainer}>
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
              <button onClick={() => openPopup('profile')} className={styles.btnPrimary}>Trang cá nhân</button>
              <button className={styles.btnSecondary} onClick={handleLogout}>Đăng xuất</button>
            </div>
          )}
        </div>
      </header>

      <main className={styles.homeContent}>
        <HomeContent />
        <SimpleAbout currentUser={currentUser} onOpenPopup={openPopup} />
      </main>

      <footer className={styles.homeFooter}>
        <Footer />
      </footer>

      {showPopup && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <button className={styles.modalCloseBtn} onClick={closePopup}>&times;</button>
            {authType === 'login' && (
              <Login
                onClose={closePopup}
                onOpenRegister={() => setAuthType('register')}
                onOpenForgot={() => setAuthType('forgot')}
              />
            )}
            {authType === 'register' && (
              <Register
                onClose={closePopup}
                onOpenLogin={() => setAuthType('login')}
              />
            )}
            {authType === 'forgot' && (
              <ForgotPassword
                onClose={closePopup}
                onOpenLogin={() => setAuthType('login')}
              />
            )}
            {authType === 'profile' && (
              <ProfilePopup onClose={closePopup} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;