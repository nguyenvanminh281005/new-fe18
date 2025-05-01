import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext';
import styles from '../../css/Home.module.css'; // Import CSS module
import Login from '../Login/Login';  // Import Login component
import Register from '../Register/Register';  // Import Register component
import HomeContent from './components/HomeContent';
import { useNavigate } from 'react-router-dom';

// Component About đơn giản hóa cho trang Home
const SimpleAbout = () => {
  const { currentUser } = useAuth();
  const [showPopup, setShowPopup] = useState(false);
  const [authType, setAuthType] = useState('login'); // 'login' hoặc 'register'

  const openPopup = (type) => {
    setAuthType(type);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className={styles.simpleAbout}>

      <div className={styles.ctaSection}>
        <Link to="/about" className={styles.btnPrimary}>Tìm hiểu thêm</Link>
        {currentUser ? (
          <Link to="/dashboard" className={styles.btnSecondary}>Dự đoán ngay</Link>
        ) : (
          <button onClick={() => openPopup('login')} className={styles.btnSecondary}>Dự đoán ngay</button>
        )}
      </div>
    </div>
  );
};

function Home() {
  const { currentUser, logout } = useAuth();
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();  
  const [authType, setAuthType] = useState('login'); // 'login' hoặc 'register'
  const handleLogout = () => { logout(); navigate('/home'); };
  const openPopup = (type) => {
    setAuthType(type);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className={styles.homeContainer}>
      {/* Header với nút đăng nhập/đăng ký */}
      <header className={styles.homeHeader}>
        <h1>Parkinson's Disease Prediction</h1>
          <div className={styles.authButtons}>
            {!currentUser ? (
              <>
                <button onClick={() => openPopup('login')} className={styles.btnPrimary}>Đăng nhập</button>
                <button onClick={() => openPopup('register')} className={styles.btnSecondary}>Đăng ký</button>
              </>
            ) : (
              <div className={styles.authButtons}>
                <button onClick={() => navigate('/profile')} className={styles.btnPrimary}> Profile </button>
                <button className={styles.btnSecondary} onClick={handleLogout}>Log Out</button>
              </div>
            )}
          </div>
      </header>

      <main className={styles.homeContent}>
        <HomeContent />
        <SimpleAbout />
      </main>

      <footer className={styles.homeFooter}>
        <p>&copy; Nguyen Van Minh</p>
      </footer>

        {showPopup && (
        <div className={styles.modalBackdrop}>
            <div className={styles.modalContent}>
            <button className={styles.modalCloseBtn} onClick={closePopup}>
                &times;
            </button>
            {authType === 'login' ? (
                <Login onClose={closePopup} />
            ) : (
                <Register onClose={closePopup} />
            )}
            </div>
        </div>
        )}
    </div>
  );
}

export default Home;