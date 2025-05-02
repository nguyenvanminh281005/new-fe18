import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../css/About.module.css';
import Login from '../Login/Login';
import Register from '../Register/Register';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import ProfilePopup from '../Profile/ProfilePopup';
import AboutMain from './AboutMain';
import { useAuth } from '../AuthContext/AuthContext';

const About = () => {
  const { currentUser } = useAuth();
  const [showPopup, setShowPopup] = useState(false);
  const [authType, setAuthType] = useState('login');
  const navigate = useNavigate();

  useEffect(() => {
    const accordionHeaders = document.querySelectorAll(`.${styles.accordionHeader}`);
    accordionHeaders.forEach(header => {
      header.addEventListener('click', () => {
        const accordionItem = header.parentElement;
        accordionItem.classList.toggle(styles.active);
      });
    });

    return () => {
      accordionHeaders.forEach(header => {
        header.removeEventListener('click', () => {});
      });
    };
  }, []);

  const openPopup = (type = 'login') => {
    setAuthType(type);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handlePredictClick = () => {
    if (currentUser) {
      navigate('/dashboard');
    } else {
      openPopup('login');
    }
  };

  return (
    <>
      <nav className={styles.navBar}>
        <div className={styles.container}>
          <div className={styles.navContent}>
            <Link to="/" className={styles.navButton}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <span>Trang chủ</span>
            </Link>

            <button className={styles.navButton} onClick={handlePredictClick}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
              <span>Dự đoán</span>
            </button>
          </div>
        </div>
      </nav>

      <>
      <AboutMain/>
      </>

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
    </>
  );
};

export default About;