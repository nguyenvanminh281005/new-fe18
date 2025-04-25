// PredictionForm.js
import React from 'react';
import styles from '../../../css/Dashboard.module.css';

function PredictionForm({ 
  features, 
  featureNames, 
  error, 
  handleChange, 
  resetForm, 
  handleSubmit, 
  isLoading,
  num
}) {
  return (
    <>
      <div className={styles.instructions}>
        <p>Enter the {num} input values below to predict Parkinson's disease likelihood:</p>
      </div>
      
      {error && <div className={styles.error}>{error}</div>}
      
      <div className={styles.grid}>
        {features.map((feature, index) => (
          <div key={index} className={styles.inputGroup}>
            <label>{featureNames[index] || `F${index + 1}`}</label>
            <input
              type="number"
              value={feature}
              placeholder="Enter value"
              onChange={(e) => handleChange(index, e.target.value)}
              className={styles.input}
            />
          </div>
        ))}
      </div>
      
      <div className={styles.buttonGroup}>
        <button 
          className={styles.resetButton} 
          onClick={resetForm}
        >
          Reset
        </button>
        <button 
          className={styles.predictButton} 
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Predict'}
        </button>
      </div>
    </>
  );
}

export default PredictionForm;