import React from 'react';
import { motion } from 'framer-motion';
import styles from '../../../css/Dashboard.module.css';

// Giới hạn tối đa cho mỗi feature (ví dụ giả định)
const featureMaxValues = [10, 30, 10, 5, 5, 40, 1, 300,100,100];

const featureDescriptions = [
  'Khiếu nại về trí nhớ (Memory Complaints)',                            // MemoryComplaints
  'Vấn đề về hành vi (Behavioral Problems)',                            // BehavioralProblems
  'Khả năng thực hiện các hoạt động sinh hoạt hàng ngày (ADL)',         // ADL
  'Điểm kiểm tra trạng thái nhận thức (MMSE)',                          // MMSE
  'Đánh giá chức năng sống độc lập (Functional Assessment)',            // FunctionalAssessment
  'Mức độ mất phương hướng về thời gian và không gian (Disorientation)',// Disorientation
  'Thay đổi tính cách hoặc hành vi (Personality Changes)',              // PersonalityChanges
  'Thói quen hút thuốc lá (có/không hoặc số năm hút) (Smoking)',        // Smoking
  'Tiền sử chấn thương đầu (có/không) (Head Injury)',                   // HeadInjury
  'Mức cholesterol toàn phần trong máu (mg/dL) (Cholesterol Total)',    // CholesterolTotal
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
          <option value="best_model">Best Model</option>
          <option value="xgboost_lib">XGBoost Lib</option>
          <option value="xgboost_scr">XGBoost Scr</option>
          <option value="random_forest_lib">Random Forest Lib</option>
          <option value="random_forest_scr">Random Forest Scr</option>
        </select>
      </div>

      <div className={styles.grid}>
        {features.map((feature, index) => {
          const numericValue = parseFloat(feature);
          const percent = isNaN(numericValue)
            ? 0
            : Math.min(100, (numericValue / featureMaxValues[index]) * 100);

          return (
            <motion.div
              key={index}
              className={styles.inputGroup}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
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
              <div className={styles.progressBarWrapper}>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progress}
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <span className={styles.progressLabel}>{`${Math.round(percent)}%`}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.buttonGroup}>
        <button 
          className={styles.resetButton} 
          onClick={resetForm}
        >
          Xóa hết
        </button>
        <button 
          className={styles.predictButton} 
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? 'Đang xử lý...' : 'Dự đoán'}
        </button>
      </div>
    </>
  );
}

export default PredictionForm;
