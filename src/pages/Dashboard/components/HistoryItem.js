import React from 'react';
import styles from '../../../css/Dashboard.module.css';
import { motion } from 'framer-motion';
import { Clock, Brain, Trash2, Upload, Share } from 'lucide-react';

function HistoryItem({ 
  item, 
  featureNames, 
  loadFromHistory, 
  deleteHistoryItem,
  setShowHistory
}) {
  return (
    <motion.div 
      className={`${styles.historyItem} ${item.prediction === 'Disease Detected' ? styles.historyPositive : styles.historyNegative}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.historyInfo}>
        <span className={styles.historyTimestamp}>
          <Clock size={16} style={{ marginRight: 4 }} />
          {item.timestamp}
        </span>
        <span className={styles.historyResult}>
          <Brain size={16} style={{ marginRight: 4 }} />
          Kết quả: <strong>{item.prediction}</strong>
        </span>
        <span className={styles.historyModel}>
          Mô hình: <strong>{item.model}</strong>
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
          <Upload size={14} style={{ marginRight: 6 }} />
          Tải lên
        </button>
        <button 
          className={styles.deleteButton} 
          onClick={() => deleteHistoryItem(item.id)}
        >
          <Trash2 size={14} style={{ marginRight: 6 }} />
          Xóa
        </button>
        <button 
          className={styles.shareButton} 
          onClick={() => {
            loadFromHistory(item);
            setShowHistory(false);
          }}
        >
          <Share size={14} style={{ marginRight: 6 }} />
          Chia sẻ
        </button>
      </div>
    </motion.div>
  );
}

export default HistoryItem;
