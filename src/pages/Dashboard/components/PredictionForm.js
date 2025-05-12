import React from 'react';
import styles from '../../../css/Dashboard.module.css';

const featureDescriptions = [
  'Khả năng thực hiện các hoạt động sinh hoạt hàng ngày',
  'Điểm kiểm tra trạng thái nhận thức',
  'Đánh giá chức năng sống độc lập',
  'Mức độ mất phương hướng về thời gian và không gian',
  'Thay đổi tính cách hoặc hành vi',
  'Thói quen hút thuốc lá (có/không hoặc số năm hút)',
  'Tiền sử chấn thương đầu (có/không)',
  'Mức cholesterol toàn phần trong máu (mg/dL)',
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
          <option value="xgboost_lib">XGBoost Lib</option>
          <option value="random_forest_lib">Random Forest Lib</option>
          <option value="xgboost_scr">XGBoost Scr</option>
          <option value="random_forest_scr">Random Forest Scr</option>
          <option value="best_model">Best Model</option>
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