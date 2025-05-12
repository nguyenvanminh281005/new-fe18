// HistoryPanel.js
import React from 'react';
import styles from '../../../css/Dashboard.module.css';
import HistoryItem from './HistoryItem';

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
    <div className={styles.historyPanel}>
      <div className={styles.historyHeader}>
        <h2>Lịch sử dự đoán</h2>
        <div className={styles.exportButtons}>
          <button className={styles.exportCsvButton} onClick={exportToCSV}>
            Xuất ra file CSV
          </button>
          <button className={styles.exportPdfButton} onClick={exportToPDF}>
            Xuất ra file PDF
          </button>
        </div>
        {predictionHistory.length > 0 && (
          <button className={styles.clearButton} onClick={clearAllHistory}>
            Xóa tất cả
          </button>
        )}
      </div>

      {predictionHistory.length === 0 ? (
        <div className={styles.emptyHistory}>
          <p>Không có dữ liệu lịch sử dự đoán.</p>
          <p>Hãy nhập thông tin dự đoán để có lịch sử.</p>
        </div>
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
    </div>
  );
}

export default HistoryPanel;