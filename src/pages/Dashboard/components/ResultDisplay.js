import React from 'react';
import DoctorAdvisor from './DoctorAdvisor';
import styles from '../../../css/Dashboard.module.css';
import { FaSadTear, FaSmileBeam } from 'react-icons/fa';

function ResultDisplay({ result }) {
  const isPositive = result === 'Disease Detected';

  const image = isPositive
    ? <FaSadTear size={64} color="#e74c3c" />
    : <FaSmileBeam size={64} color="#2ecc71" />;

  return (
    <div className={`${styles.resultBox} ${isPositive ? styles.positive : styles.negative}`}>
      <div className={styles.resultIcon}>
        {image}
      </div>

      <h3>Kết quả dự đoán:</h3>
      <p className={styles.resultText}>{result}</p>

      <p className={styles.resultDescription}>
        {isPositive 
          ? 'Bạn đã được dự đoán mắc bệnh Alzheimer, hãy liên hệ tới bác sĩ để được nhận lời khuyên và điều trị.'
          : 'Chúc mừng, bạn được dự đoán có tỉ lệ mắc bệnh rất thấp.'}
      </p>
      {/* <DoctorAdvisor isPositive={isPositive} /> */}
    </div>
    
  );
}

export default ResultDisplay;
