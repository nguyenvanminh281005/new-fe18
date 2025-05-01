import React from 'react';
import styles from '../../css/Home.module.css';
import Login from '../Login/Login';
import Register from '../Register/Register';
import ForgotPassword from '../ForgotPassword/ForgotPassword';

function AuthModal({ authType, onClose, setAuthType }) {
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <button className={styles.modalCloseBtn} onClick={onClose}>&times;</button>
        {authType === 'login' && (
          <Login 
            onClose={onClose} 
            onOpenRegister={() => setAuthType('register')} 
            onOpenForgot={() => setAuthType('forgot')} 
          />
        )}
        {authType === 'register' && (
          <Register 
            onClose={onClose} 
            onOpenLogin={() => setAuthType('login')} 
          />
        )}
        {authType === 'forgot' && (
          <ForgotPassword 
            onClose={onClose} 
            onOpenLogin={() => setAuthType('login')} 
          />
        )}
      </div>
    </div>
  );
}

export default AuthModal;