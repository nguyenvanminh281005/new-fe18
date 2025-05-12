// PredictionForm.js
import React from 'react';
import styles from '../../../css/Dashboard.module.css';

const featureDescriptions = [
  'Tần số cơ bản của giọng nói',
  'Tần số cao nhất',
  'Tần số thấp nhất',
  'Độ dao động tần số (Jitter)',
  'Độ phức tạp tái tạo pha (RPDE)',
  'Phân tích dao động DFA',
  'Độ lan truyền phổ tần số',
  'Độ phức tạp phi tuyến (D2)',
];

function PredictionForm({ 
  features, 
  featureNames, 
  error, 
  handleChange, 
  resetForm, 
  handleSubmit, 
  isLoading,
  num,
  selectedModel,
  onModelChange
}) {
  return (
    <>
      <div className={styles.modelSelector}>
        <label htmlFor="model">Chọn mô hình dự đoán:</label>
        <select 
          id="model"
          value={selectedModel}
          onChange={(e) => onModelChange(e.target.value)}
          className={styles.select}
        >
          <option value="xgboost">XGBoost</option>
          <option value="random_forest">Random Forest</option>
          <option value="svm">SVM</option>
          {/* Có thể thêm các mô hình khác nếu cần */}
        </select>
      </div>

      <div className={styles.grid}>
        {features.map((feature, index) => (
          <div key={index} className={styles.inputGroup}>
            <label>
              {featureNames[index] || `F${index + 1}`} –{' '}
              <span className={styles.hint}>{featureDescriptions[index]}</span>
            </label>
            <input
              type="number"
              value={feature}
              placeholder="Nhập giá trị"
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
