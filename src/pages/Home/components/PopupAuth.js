import React from 'react';
import styles from '../../../css/Home.module.css';
import Login from '../../Login/Login';
import Register from '../../Register/Register';

const PopupAuth = ({ authType, onClose }) => {
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <button className={styles.modalCloseBtn} onClick={onClose}>&times;</button>
        {authType === 'login' ? <Login onClose={onClose} /> : <Register onClose={onClose} />}
      </div>
    </div>
  );
};

export default PopupAuth;
