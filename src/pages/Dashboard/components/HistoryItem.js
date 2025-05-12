// HistoryItem.js
import React from 'react';
import styles from '../../../css/Dashboard.module.css';

function HistoryItem({ 
  item, 
  featureNames, 
  loadFromHistory, 
  deleteHistoryItem,
  setShowHistory
}) {
  return (
    <div 
      className={`${styles.historyItem} ${item.prediction === 'Disease Detected' ? styles.historyPositive : styles.historyNegative}`}
    >
        <div className={styles.historyInfo}>
          <span className={styles.historyTimestamp}>{item.timestamp}</span>
          <span className={styles.historyResult}>
            Kết quả: <strong>{item.prediction}</strong>
          </span>
          <span className={styles.historyModel}>
            Model sử dụng: <strong>{item.model}</strong>
          </span>
        </div>

      
      <div className={styles.historyFeatures}>
        {item.features.map((value, idx) => (
          <div key={idx} className={styles.historyFeature}>
            <span>{featureNames[idx] || `F${idx + 1}`}: </span>
            <span>{value}</span>
          </div>
        ))}
      </div>
      
      <div className={styles.historyActions}>
        <button 
          className={styles.loadButton} 
          onClick={() => loadFromHistory(item)}
        >
          Tải lên
        </button>
        <button 
          className={styles.deleteButton} 
          onClick={() => deleteHistoryItem(item.id)}
        >
          Xóa
        </button>
        <button 
          className={styles.shareButton} 
          onClick={() => {
            loadFromHistory(item);
            setShowHistory(false);
          }}
        >
          Chia sẻ
        </button>
      </div>
    </div>
  );
}

export default HistoryItem;