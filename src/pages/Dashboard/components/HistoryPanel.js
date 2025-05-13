import React from 'react';
import styles from '../../../css/Dashboard.module.css';
import HistoryItem from './HistoryItem';
import { FileDown, FileText, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

function HistoryPanel({ 
  predictionHistory, 
  featureNames, 
  loadFromHistory, 
  deleteHistoryItem, 
  clearAllHistory,
  exportToCSV,
  exportToPDF,
  setShowHistory
}) {
  return (
    <motion.div 
      className={styles.historyPanel}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.historyHeader}>
        <h2>🧠 Lịch sử dự đoán</h2>

        <div className={styles.exportButtons}>
          <button className={styles.exportCsvButton} onClick={exportToCSV}>
            <FileText size={16} style={{ marginRight: 6 }} />
            Xuất CSV
          </button>
          <button className={styles.exportPdfButton} onClick={exportToPDF}>
            <FileDown size={16} style={{ marginRight: 6 }} />
            Xuất PDF
          </button>
        </div>

        {predictionHistory.length > 0 && (
          <button className={styles.clearButton} onClick={clearAllHistory}>
            <Trash2 size={16} style={{ marginRight: 6 }} />
            Xóa tất cả
          </button>
        )}
      </div>

      {predictionHistory.length === 0 ? (
        <motion.div 
          className={styles.emptyHistory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p>Không có dữ liệu lịch sử dự đoán.</p>
          <p>Hãy nhập thông tin để bắt đầu dự đoán.</p>
        </motion.div>
      ) : (
        <div className={styles.historyList}>
          {predictionHistory.map((item) => (
            <HistoryItem
              key={item.id}
              item={item}
              featureNames={featureNames}
              loadFromHistory={loadFromHistory}
              deleteHistoryItem={deleteHistoryItem}
              setShowHistory={setShowHistory}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default HistoryPanel;
