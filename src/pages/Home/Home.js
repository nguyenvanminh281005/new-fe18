import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaInfoCircle, FaBrain, FaSignInAlt, FaUserPlus, FaUser, FaSignOutAlt, FaTimes } from 'react-icons/fa';
import styles from '../../css/Home.module.css';
import Login from '../Login/Login';
import Register from '../Register/Register';
import HomeContent from './components/HomeContent';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import Footer from './components/Footer';
import ProfilePopup from '../Profile/ProfilePopup';

const SimpleAbout = ({ currentUser, onOpenPopup }) => {
  return (
    <div className={styles.simpleAboutTopLeft}>
      <Link to="/about" className={styles.btnPrimary}>
        <span className={styles.btnContent}>
          <FaInfoCircle className={styles.btnIcon} /> Tìm hiểu thêm
        </span>
      </Link>
      {currentUser ? (
        <Link to="/dashboard" className={styles.btnSecondary}>
          <span className={styles.btnContent}>
            <FaBrain className={styles.btnIcon} /> Dự đoán ngay
          </span>
        </Link>
      ) : (
        <button onClick={() => onOpenPopup('login')} className={styles.btnSecondary}>
          <span className={styles.btnContent}>
            <FaBrain className={styles.btnIcon} /> Dự đoán ngay
          </span>
        </button>
      )}
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
      <motion.header
        className={styles.homeHeader}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <SimpleAbout currentUser={currentUser} onOpenPopup={openPopup} />

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
        </motion.h1>

        <div className={styles.authButtons}>
          {!currentUser ? (
            <>
              <motion.button
                onClick={() => openPopup('login')}
                className={styles.btnPrimary}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <FaSignInAlt className={styles.btnIcon} /> Đăng nhập
              </motion.button>
              <motion.button
                onClick={() => openPopup('register')}
                className={styles.btnSecondary}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <FaUserPlus className={styles.btnIcon} /> Đăng ký
              </motion.button>
            </>
          ) : (
            <div className={styles.authButtons}>
              <motion.button
                onClick={() => openPopup('profile')}
                className={styles.btnPrimary}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <FaUser className={styles.btnIcon} /> Trang cá nhân
              </motion.button>
              <motion.button
                className={styles.btnSecondary}
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <FaSignOutAlt className={styles.btnIcon} /> Đăng xuất
              </motion.button>
            </div>
          )}
        </div>
      </motion.header>

      <motion.main
        className={styles.homeContent}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <HomeContent />
      </motion.main>

      <motion.footer
        className={styles.homeFooter}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <Footer />
      </motion.footer>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            className={styles.modalBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className={styles.modalContent}
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.button
                className={styles.modalCloseBtn}
                onClick={closePopup}
                whileHover={{ scale: 1.2, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTimes />
              </motion.button>
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Home;