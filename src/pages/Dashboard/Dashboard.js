import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext/AuthContext';
import styles from '../../css/Dashboard.module.css';
import Papa from 'papaparse';
import { jsPDF } from 'jspdf';
import Navigation from './components/Navigation';
import PredictionForm, { BatchResultsDisplay } from './components/PredictionForm';
import HistoryPanel from './components/HistoryPanel';
import ResultDisplay from './components/ResultDisplay';
import AdviceSection from './components/AdviceSection';
import EmailSharingFeature from '../EmailSharing/EmailSharingFeature';

function Dashboard() {
  const num = 10;
  const [features, setFeatures] = useState(Array(num).fill(''));
  const [featureNames, setFeatureNames] = useState(Array(num).fill('F'));
  const [result, setResult] = useState(null);
  const [batchResults, setBatchResults] = useState(null);
  const [predictionHistory, setPredictionHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const [selectedModel, setSelectedModel] = useState('best_model');

  useEffect(() => {
    fetch('/alzheimer_done.csv')
      .then((response) => response.text())
      .then((text) => {
        const rows = text.trim().split('\n').map(row => row.split(','));
        if (rows.length > 0) {
          setFeatureNames(rows[0].slice(0, num));
        }
      })
      .catch((error) => {
        console.error('Error loading features:', error);
        setError('Không thể tải tên đặc trưng. Sử dụng nhãn mặc định.');
      });

    loadUserPredictionHistory();
  }, [currentUser]);

  const loadUserPredictionHistory = async () => {
    try {
      const key = `predictionHistory_${currentUser.id}`;
      const savedHistory = localStorage.getItem(key);
      if (savedHistory) {
        setPredictionHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error('Error loading history:', error);
    }
  };

  useEffect(() => {
    if (currentUser && predictionHistory.length > 0) {
      const key = `predictionHistory_${currentUser.id}`;
      localStorage.setItem(key, JSON.stringify(predictionHistory));
    }
  }, [predictionHistory, currentUser]);

  const handleChange = (index, value) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const resetForm = () => {
    setFeatures(Array(num).fill(''));
    setResult(null);
    setBatchResults(null);
    setError('');
  };

  const deleteHistoryItem = (id) => {
    setPredictionHistory(prev => prev.filter(item => item.id !== id));
  };

  const loadFromHistory = (historyItem) => {
    setFeatures(historyItem.features);
    setResult({
      prediction: historyItem.prediction,
      probability: historyItem.probability
    });
    setBatchResults(null);
    setShowHistory(false);
  };

  const clearAllHistory = () => {
    setPredictionHistory([]);
    const key = `predictionHistory_${currentUser.id}`;
    localStorage.removeItem(key);
  };

  const exportToCSV = () => {
    if (predictionHistory.length === 0) {
      alert('Không có dữ liệu để xuất!');
      return;
    }

    const csvData = predictionHistory.map(({ timestamp, features, prediction, probability, model, type, count }) => {
      const base = {
        Timestamp: timestamp,
        Type: type || 'single',
        Prediction: prediction || 'N/A',
        Probability: probability ? `${(probability * 100).toFixed(2)}%` : 'N/A',
        Model: model
      };
      if (type === 'batch') {
        base.Count = count;
      } else {
        base.Features = features.join(', ');
      }
      return base;
    });

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'prediction_history.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => {
    if (predictionHistory.length === 0) {
      alert('Không có dữ liệu để xuất!');
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text('Lịch sử dự đoán bệnh Parkinson', 10, 10);

    let yOffset = 20;
    predictionHistory.forEach(({ timestamp, features, prediction, probability, model, type, count }, idx) => {
      doc.text(`#${idx + 1} - ${timestamp}`, 10, yOffset);
      doc.text(`Loại: ${type || 'single'}`, 10, yOffset + 7);
      doc.text(`Dự đoán: ${prediction}`, 10, yOffset + 14);
      doc.text(`Mô hình: ${model}`, 10, yOffset + 21);
      if (probability) {
        doc.text(`Xác suất: ${(probability * 100).toFixed(2)}%`, 10, yOffset + 28);
      }
      if (type === 'batch') {
        doc.text(`Số mẫu: ${count}`, 10, yOffset + 35);
      } else {
        features.forEach((value, featureIdx) => {
          doc.text(`${featureNames[featureIdx] || `F${featureIdx + 1}`}: ${value}`, 10, yOffset + (featureIdx + (probability ? 5 : 4)) * 7);
        });
      }

      yOffset += (type === 'batch' ? 42 : (features.length + (probability ? 5 : 4)) * 7);
      if (yOffset > 280) {
        doc.addPage();
        yOffset = 20;
      }
    });

    doc.save('prediction_history.pdf');
  };

  const getCurrentPredictionData = () => {
    return {
      prediction: result?.prediction || '',
      probability: result?.probability || null,
      features: features,
      featureNames: featureNames,
      timestamp: new Date().toLocaleString(),
      userId: currentUser?.id || 'Unknown'
    };
  };

  return (
    <>
      <Navigation />
      <div className={styles.dashboardContainer}>
        <header className={styles.header}>
          <h1>Ứng dụng dự đoán xét nghiệm bệnh Parkinson</h1>
          <div className={styles.userSection}>
            <span>Chào mừng trở lại, {currentUser.email}</span>
          </div>
          <div className={styles.tabs}>
            <button
              className={!showHistory ? styles.activeTab : styles.tab}
              onClick={() => setShowHistory(false)}
            >
              Dự đoán
            </button>
            <button
              className={showHistory ? styles.activeTab : styles.tab}
              onClick={() => setShowHistory(true)}
            >
              Lịch sử dự đoán {predictionHistory.length > 0 && `(${predictionHistory.length})`}
            </button>
          </div>
        </header>

        {!showHistory ? (
          <div className={styles.predictionPanel}>
            <PredictionForm
              features={features}
              featureNames={featureNames}
              error={error}
              setError={setError}
              handleChange={handleChange}
              resetForm={resetForm}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              num={num}
              selectedModel={selectedModel}
              onModelChange={setSelectedModel}
              setFeatures={setFeatures}
              currentUser={currentUser}
              setResult={setResult}
              setPredictionHistory={setPredictionHistory}
              setBatchResults={setBatchResults}
            />

            {result && (
              <>
                <ResultDisplay result={result.prediction} probability={result.probability} />
                <AdviceSection
                  features={features}
                  result={result.prediction}
                  currentUser={currentUser}
                />
                <EmailSharingFeature predictionData={getCurrentPredictionData()} />
              </>
            )}

            {batchResults && (
              <BatchResultsDisplay batchResults={batchResults} />
            )}
          </div>
        ) : (
          <HistoryPanel
            predictionHistory={predictionHistory}
            featureNames={featureNames}
            loadFromHistory={loadFromHistory}
            deleteHistoryItem={deleteHistoryItem}
            clearAllHistory={clearAllHistory}
            exportToCSV={exportToCSV}
            exportToPDF={exportToPDF}
            setShowHistory={setShowHistory}
          />
        )}
        <p>© Nguyen Van Minh</p>
      </div>
    </>
  );
}

export default Dashboard;