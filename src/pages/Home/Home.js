import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext';
import styles from '../../css/Home.module.css';
import Login from '../Login/Login';
import Register from '../Register/Register';
import HomeContent from './components/HomeContent';
import ForgotPassword from '../ForgotPassword/ForgotPassword'
import { useNavigate } from 'react-router-dom';
import Footer from './components/Footer';

const SimpleAbout = () => {
  const { currentUser } = useAuth();
  const [showPopup, setShowPopup] = useState(false);
  const [authType, setAuthType] = useState('login');

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
  const [authType, setAuthType] = useState('login'); // 'login' | 'register' | 'forgot'
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
        <Footer/>
      </footer>

      {showPopup && (
      <div className={styles.modalBackdrop}>
        <div className={styles.modalContent}>
          <button className={styles.modalCloseBtn} onClick={closePopup}>&times;</button>
          {authType === 'login' && (
            <Login onClose={closePopup} 
            onOpenRegister={() => setAuthType('register')} 
            onOpenForgot={() => setAuthType('forgot')} />
          )}
          {authType === 'register' && (
            <Register onClose={closePopup} 
            onOpenLogin={() => setAuthType('login')} />
          )}
          {authType === 'forgot' && (
            <ForgotPassword onClose={closePopup} 
              onOpenLogin={() => setAuthType('login')} 
            />
          )}
            </div>
          </div>
        )}
    </div>
  );
}

export default Home;