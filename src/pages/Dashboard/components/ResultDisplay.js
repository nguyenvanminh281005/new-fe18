// ResultDisplay.js
import React from 'react';
import styles from '../../../css/Dashboard.module.css';

function ResultDisplay({ result, onGetAdvice }) {
  const isPositive = result === 'Parkinson Detected';

  return (
    <div className={`${styles.resultBox} ${isPositive ? styles.positive : styles.negative}`}>
      <h3>Prediction Result:</h3>
      <p className={styles.resultText}>{result}</p>
      <p className={styles.resultDescription}>
        {isPositive 
          ? 'The model predicts a likelihood of Parkinson\'s disease. Please consult with a healthcare professional.'
          : 'The model predicts a lower likelihood of Parkinson\'s disease.'}
      </p>

      {isPositive && (
        <button 
          className={styles.adviceButton}
          onClick={onGetAdvice}
        >
          Nhận lời khuyên từ chuyên gia
        </button>
      )}
    </div>
  );
}

export default ResultDisplay;