import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext/AuthContext';
import styles from '../../../css/Home.module.css';

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

      {showPopup && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <button className={styles.modalCloseBtn} onClick={closePopup}>&times;</button>
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
};

export default SimpleAbout;