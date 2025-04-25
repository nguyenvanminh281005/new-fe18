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
        <h2>Your Prediction History</h2>
        <div className={styles.exportButtons}>
          <button className={styles.exportCsvButton} onClick={exportToCSV}>
            Export CSV
          </button>
          <button className={styles.exportPdfButton} onClick={exportToPDF}>
            Export PDF
          </button>
        </div>
        {predictionHistory.length > 0 && (
          <button className={styles.clearButton} onClick={clearAllHistory}>
            Clear All
          </button>
        )}
      </div>

      {predictionHistory.length === 0 ? (
        <div className={styles.emptyHistory}>
          <p>No prediction history available yet.</p>
          <p>Make a prediction to see it here.</p>
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