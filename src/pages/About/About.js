import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../css/About.module.css';

const About = () => {
  useEffect(() => {
    // Script điều khiển accordion
    const accordionHeaders = document.querySelectorAll(`.${styles.accordionHeader}`);
    
    accordionHeaders.forEach(header => {
      header.addEventListener('click', () => {
        const accordionItem = header.parentElement;
        accordionItem.classList.toggle(styles.active);
      });
    });
    
    // Cleanup khi component unmount
    return () => {
      accordionHeaders.forEach(header => {
        header.removeEventListener('click', () => {});
      });
    };
  }, []);

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
            <Link to="/dashboard" className={styles.navButton}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
              <span>Dự đoán</span>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default About;