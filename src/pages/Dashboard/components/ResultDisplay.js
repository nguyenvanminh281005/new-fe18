// ResultDisplay.js - đã đơn giản hóa, không còn nút lấy lời khuyên
import React from 'react';
import styles from '../../../css/Dashboard.module.css';

function ResultDisplay({ result }) {
  const isPositive = result === 'Disease Detected';

  return (
    <div className={`${styles.resultBox} ${isPositive ? styles.positive : styles.negative}`}>
      <h3>Kết quả dự đoán:</h3>
      <p className={styles.resultText}>{result}</p>
      <p className={styles.resultDescription}>
        {isPositive 
          ? 'Bạn đã được dự đoán mắc bệnh Alzheimer, hãy liên hệ tới bác sĩ để được nhận lời khuyên và điều trị.'
          : 'Chúc mừng, bạn được dự đoán có tỉ lệ mắc bệnh rất thấp.'}
      </p>
    </div>
  );
}

export default ResultDisplay;