// AboutMain.jsx
import React, { useEffect } from 'react';
import styles from '../../css/About.module.css';

const AboutMain = () => {
  useEffect(() => {
    // Script điều khiển accordion
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

  return (
    <main className={styles.aboutContainer}>
      {/* ... Toàn bộ phần main giữ nguyên như file cũ ... */}
      {/* Copy toàn bộ phần <main>...</main> từ file About.js vào đây */}
    </main>
  );
};

export default AboutMain;
