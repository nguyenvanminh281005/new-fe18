// Dashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../AuthContext/AuthContext';
import styles from '../../css/Dashboard.module.css';
import Papa from 'papaparse';
import { jsPDF } from 'jspdf';
import Navigation from './components/Navigation';
import PredictionForm from './components/PredictionForm';
import HistoryPanel from './components/HistoryPanel';
import ResultDisplay from './components/ResultDisplay';
import AdviceSection from './components/AdviceSection';
import EmailSharingFeature from '../EmailSharing/EmailSharingFeature';

function Dashboard() {
  const num = 8;
  const [features, setFeatures] = useState(Array(num).fill(''));
  const [featureNames, setFeatureNames] = useState(Array(num).fill(`F`));
  const [result, setResult] = useState('');
  const [predictionHistory, setPredictionHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const [adviceList, setAdviceList] = useState([]);
  const [adviceError, setAdviceError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Load feature names from CSV
    fetch("/dap.csv")
      .then((response) => response.text())
      .then((text) => {
        const rows = text.trim().split("\n").map(row => row.split(","));
        if (rows.length > 1) {
          setFeatureNames(rows[0].slice(0));
        }
      })
      .catch((error) => {
        console.error("Error loading features:", error);
        setError("Couldn't load feature names. Using default labels.");
      });
    
    // Load user-specific prediction history from server/localStorage
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
      console.error("Error loading history:", error);
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
    setResult('');
    setError('');
  };

  const handleSubmit = async () => {
    // Validate inputs
    if (features.some(f => f === '')) {
      setError('Please fill in all input fields');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', {
        features: features.map(Number),
        userId: currentUser.id // Send user ID for server-side logging if needed
      });
      
      const prediction = response.data.prediction;
      setResult(prediction);
      
      const historyEntry = {
        id: Date.now(),
        timestamp: new Date().toLocaleString(),
        features: [...features],
        prediction: prediction,
        userId: currentUser.id
      };
      
      setPredictionHistory(prev => [historyEntry, ...prev].slice(0, 10));
    } catch (error) {
      console.error('Error:', error);
      setError('Error in prediction. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteHistoryItem = (id) => {
    setPredictionHistory(prev => prev.filter(item => item.id !== id));
  };

  const loadFromHistory = (historyItem) => {
    setFeatures(historyItem.features);
    setResult(historyItem.prediction);
  };

  const clearAllHistory = () => {
    setPredictionHistory([]);
    const key = `predictionHistory_${currentUser.id}`;
    localStorage.removeItem(key);
  };

  const handleLogout = () => {
    logout();
    navigate('/home');
  };

  const navigateToProfile = () => {
    navigate('/profile');
  };

  const exportToCSV = () => {
    if (predictionHistory.length === 0) {
      alert('No data to export!');
      return;
    }
  
    const csvData = predictionHistory.map(({ timestamp, features, prediction }) => ({
      Timestamp: timestamp,
      Prediction: prediction,
      ...Object.fromEntries(features.map((val, idx) => [featureNames[idx] || `F${idx + 1}`, val])),
    }));
  
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
      alert('No data to export!');
      return;
    }
  
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text('Prediction History', 10, 10);
  
    let yOffset = 20;
    predictionHistory.forEach(({ timestamp, features, prediction }, idx) => {
      doc.text(`#${idx + 1} - ${timestamp}`, 10, yOffset);
      doc.text(`Prediction: ${prediction}`, 10, yOffset + 7);
  
      features.forEach((value, featureIdx) => {
        doc.text(`${featureNames[featureIdx] || `F${featureIdx + 1}`}: ${value}`, 10, yOffset + (featureIdx + 2) * 7);
      });
  
      yOffset += (features.length + 3) * 7;
      if (yOffset > 280) {
        doc.addPage();
        yOffset = 20;
      }
    });
  
    doc.save('prediction_history.pdf');
  };

  const getCurrentPredictionData = () => {
    return {
      prediction: result,
      features: features,
      featureNames: featureNames,
      timestamp: new Date().toLocaleString(),
      userId: currentUser?.id || 'Unknown'
    };
  };
  
  const handleGetAdvice = async () => {
    try {
      setAdviceList([]);
      setAdviceError('');
      setLoading(true);
      
      const response = await axios.post('http://127.0.0.1:5000/auth/get_advice', {
        features: features.map(Number),
        prediction: result === 'Parkinson Detected' ? 1 : 0,
        userId: currentUser.id
      });
      
      // Kiểm tra nếu response.data.advice là chuỗi JSON
      if (typeof response.data.advice === 'string') {
        try {
          // Cố gắng parse chuỗi JSON
          const parsedAdvice = JSON.parse(response.data.advice);
          if (Array.isArray(parsedAdvice)) {
            setAdviceList(parsedAdvice);
          } else {
            setAdviceError('Định dạng lời khuyên không hợp lệ');
          }
        } catch (parseError) {
          console.error('Lỗi khi parse JSON:', parseError);
          setAdviceError('Không thể xử lý dữ liệu lời khuyên');
        }
      } else if (Array.isArray(response.data.advice)) {
        // Nếu đã là mảng object
        setAdviceList(response.data.advice);
      } else {
        setAdviceError('Định dạng lời khuyên không hợp lệ');
      }
    } catch (error) {
      console.error('Lỗi khi lấy lời khuyên:', error);
      setAdviceError('Không thể lấy lời khuyên. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navigation />
      <div className={styles.dashboardContainer}>
        <header className={styles.header}>
          <h1>Parkinson's Disease Prediction</h1>
          <div className={styles.userSection}>
            <span>Welcome, {currentUser.email}</span>
            <div className={styles.userMenu}>
              <button className={styles.profileButton} onClick={navigateToProfile}>Profile</button>
              <button className={styles.logoutButton} onClick={handleLogout}>Log Out</button>
            </div>
          </div>
          <div className={styles.tabs}>
            <button 
              className={!showHistory ? styles.activeTab : styles.tab} 
              onClick={() => setShowHistory(false)}
            >
              Prediction
            </button>
            <button 
              className={showHistory ? styles.activeTab : styles.tab} 
              onClick={() => setShowHistory(true)}
            >
              History {predictionHistory.length > 0 && `(${predictionHistory.length})`}
            </button>
          </div>
        </header>

        {!showHistory ? (
          <div className={styles.predictionPanel}>
            <PredictionForm 
              features={features}
              featureNames={featureNames}
              error={error}
              handleChange={handleChange}
              resetForm={resetForm}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
              num={num}
            />
            
            {result && (
            <>
              <ResultDisplay result={result} />
              
              {/* Component lời khuyên mới */}
              <AdviceSection
                features={features}
                result={result}
                currentUser={currentUser}
              />
              
              <EmailSharingFeature predictionData={getCurrentPredictionData()} />
            </>
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

        <footer className={styles.footer}>
          <p>&copy; Nguyen Van Minh</p>
        </footer>
      </div>
    </>
  );
}

export default Dashboard;