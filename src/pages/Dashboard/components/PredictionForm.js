import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import styles from '../../../css/Dashboard.module.css';
import Papa from 'papaparse';

const featureMaxValues = [10, 30, 10, 5, 5, 40, 1, 300, 100, 100];

const featureDescriptions = [
  'Khiếu nại về trí nhớ (Memory Complaints)',
  'Vấn đề về hành vi (Behavioral Problems)',
  'Khả năng thực hiện các hoạt động sinh hoạt hàng ngày (ADL)',
  'Điểm kiểm tra trạng thái nhận thức (MMSE)',
  'Đánh giá chức năng sống độc lập (Functional Assessment)',
  'Mức độ mất phương hướng về thời gian và không gian (Disorientation)',
  'Thay đổi tính cách hoặc hành vi (Personality Changes)',
  'Thói quen hút thuốc lá (Smoking)',
  'Tiền sử chấn thương đầu (Head Injury)',
  'Mức cholesterol toàn phần trong máu (Cholesterol Total)',
];

function PredictionForm({ 
  features, 
  featureNames, 
  error, 
  setError,
  handleChange, 
  resetForm, 
  isLoading,
  setIsLoading,
  num,
  selectedModel,
  onModelChange,
  setFeatures,
  currentUser,
  setResult,
  setPredictionHistory,
  setBatchResults // Thêm prop để hiển thị kết quả batch prediction
}) {
  const [inputMode, setInputMode] = useState('manual');
  const [fileError, setFileError] = useState('');
  const [batchData, setBatchData] = useState(null);
  const [hasHeaders, setHasHeaders] = useState(true);

  // Xử lý upload file CSV cho cả single và batch prediction
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFileError('');

    if (!file) return;
    if (!file.name.endsWith('.csv')) {
      setFileError('Chỉ chấp nhận file CSV.');
      return;
    }

    Papa.parse(file, {
      header: false,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (result) => {
        const rows = result.data.filter(row => row.length > 0);
        
        // Kiểm tra xem có đúng 10 cột không
        if (rows.some(row => row.length !== 10)) {
          setFileError(`Mỗi dòng phải chứa đúng 10 giá trị. Vui lòng kiểm tra lại file CSV.`);
          return;
        }

        // Kiểm tra có phải tất cả đều là số không
        let startRow = 0;
        
        // Nếu có header thì bỏ qua dòng đầu
        if (hasHeaders) {
          startRow = 1;
          
          // Kiểm tra xem có thực sự là header không (nếu dòng đầu toàn số thì có thể không phải header)
          if (rows.length > 0 && rows[0].every(val => typeof val === 'number' && !isNaN(val))) {
            const confirmUseFirstRow = window.confirm(
              "Dòng đầu tiên chứa toàn số. Bạn có muốn sử dụng nó làm dữ liệu thay vì header không?"
            );
            if (confirmUseFirstRow) {
              startRow = 0;
              setHasHeaders(false);
            }
          }
        }

        // Kiểm tra dữ liệu từ dòng bắt đầu
        for (let i = startRow; i < rows.length; i++) {
          if (rows[i].some(val => typeof val !== 'number' || isNaN(val))) {
            setFileError(`Có giá trị không phải số ở dòng ${i + 1}. Vui lòng kiểm tra lại file CSV.`);
            return;
          }
        }

        // Nếu chỉ có 1 dòng dữ liệu (hoặc 2 dòng có header), thì xử lý như single prediction
        if (rows.length === 1 || (hasHeaders && rows.length === 2)) {
          const dataRow = hasHeaders ? rows[1] : rows[0];
          setFeatures(dataRow);
          setBatchData(null);
          // Reset batch results nếu có
          if (setBatchResults) setBatchResults(null);
        } 
        // Nếu có nhiều dòng dữ liệu, thì lưu lại để xử lý batch prediction
        else {
          const dataRows = hasHeaders ? rows.slice(1) : rows;
          setBatchData(dataRows);
          // Reset single result nếu có
          setResult(null);
        }

        setFileError('');
      },
      error: (err) => {
        setFileError(`Không thể đọc file CSV: ${err.message}`);
        console.error(err);
      }
    });
  };

  // Xử lý single prediction
  const handleSingleSubmit = async () => {
    if (features.some(f => f === '')) {
      setError('Hãy cung cấp đủ thông số cần thiết');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/predict`, {
        features: features.map(Number),
        model: selectedModel,
        userId: currentUser?.id
      });

      const prediction = response.data.prediction;
      const probability = response.data.probability; // Lấy xác suất nếu có
      
      setResult({
        prediction: prediction,
        probability: probability
      });

      // Lưu vào lịch sử
      if (currentUser?.id) {
        const historyEntry = {
          id: Date.now(),
          timestamp: new Date().toLocaleString(),
          features: [...features],
          prediction: prediction,
          probability: probability,
          model: selectedModel,
          userId: currentUser.id
        };

        setPredictionHistory(prev => [historyEntry, ...prev].slice(0, 10));
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.response?.data?.error || 'Lỗi khi dự đoán. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  // Xử lý batch prediction
  const handleBatchSubmit = async () => {
    if (!batchData || !batchData.length) {
      setError('Không có dữ liệu batch để dự đoán');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/predict_batch`, {
        features_list: batchData,
        model: selectedModel,
        userId: currentUser?.id
      });

      const results = response.data.results;
      
      // Hiển thị kết quả batch
      if (setBatchResults) {
        setBatchResults(results);
      }

      // Có thể lưu lại 1 entry trong lịch sử về việc dự đoán batch
      if (currentUser?.id) {
        const historyEntry = {
          id: Date.now(),
          timestamp: new Date().toLocaleString(),
          type: 'batch',
          count: batchData.length,
          model: selectedModel,
          userId: currentUser.id
        };

        setPredictionHistory(prev => [historyEntry, ...prev].slice(0, 10));
      }
    } catch (error) {
      console.error('Error in batch prediction:', error);
      setError(error.response?.data?.error || 'Lỗi khi dự đoán hàng loạt. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  // Xử lý khi nhấn nút dự đoán
  const handleSubmit = () => {
    if (inputMode === 'manual' || (inputMode === 'csv' && !batchData)) {
      // Xử lý single prediction
      handleSingleSubmit();
    } else if (batchData && batchData.length > 0) {
      // Xử lý batch prediction
      handleBatchSubmit();
    }
  };

  return (
    <>
      {/* Chọn mô hình */}
      <div className={styles.modelSelector}>
        <label htmlFor="model">Chọn mô hình dự đoán:</label>
        <select 
          id="model"
          value={selectedModel}
          onChange={(e) => onModelChange(e.target.value)}
          className={styles.select}
        >
          <option value="xgboost_lib">XGBoost Lib</option>
          <option value="xgboost_scr">XGBoost Scr</option>
          <option value="random_forest_lib">Random Forest Lib</option>
          <option value="random_forest_scr">Random Forest Scr</option>
          <option value="best_model">Best Model</option>
        </select>
      </div>

      {/* Chọn chế độ nhập */}
      <div className={styles.inputModeSelector}>
        <label>
          <input
            type="radio"
            name="inputMode"
            value="manual"
            checked={inputMode === 'manual'}
            onChange={() => {
              setInputMode('manual');
              setBatchData(null);
              setFileError('');
              // Reset batch results nếu có
              if (setBatchResults) setBatchResults(null);
            }}
          />
          Nhập tay
        </label>
        <label style={{ marginLeft: '20px' }}>
          <input
            type="radio"
            name="inputMode"
            value="csv"
            checked={inputMode === 'csv'}
            onChange={() => setInputMode('csv')}
          />
          Tải lên CSV
        </label>
      </div>

      {/* Nhập tay */}
      {inputMode === 'manual' && (
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
      )}

      {/* Upload CSV */}
      {inputMode === 'csv' && (
        <div className={styles.csvUploadSection}>
          <p><strong>Lưu ý:</strong> Chỉ chấp nhận file CSV, chứa đúng {featureMaxValues.length} giá trị số, cách nhau bằng dấu phẩy.</p>
          
          <div className={styles.csvOptions}>
            <label>
              <input
                type="checkbox"
                checked={hasHeaders}
                onChange={(e) => setHasHeaders(e.target.checked)}
              />
              File CSV có dòng tiêu đề (header)
            </label>
          </div>
          
          <input 
            type="file" 
            accept=".csv" 
            onChange={handleFileUpload}
            className={styles.input}
          />
          
          {fileError && <p className={styles.error}>{fileError}</p>}
          
          {batchData && (
            <div className={styles.batchInfo}>
              <p>Đã tải lên {batchData.length} mẫu dữ liệu. Nhấn "Dự đoán" để xử lý tất cả.</p>
            </div>
          )}
        </div>
      )}

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.buttonGroup}>
        <button 
          className={styles.resetButton} 
          onClick={() => {
            resetForm();
            setBatchData(null);
            setFileError('');
            // Reset batch results nếu có
            if (setBatchResults) setBatchResults(null);
          }}
        >
          Xóa hết
        </button>
        <button 
          className={styles.predictButton} 
          onClick={handleSubmit}
          disabled={isLoading || (inputMode === 'csv' && !batchData && features.some(f => f === ''))}
        >
          {isLoading ? 'Đang xử lý...' : batchData ? `Dự đoán ${batchData.length} mẫu` : 'Dự đoán'}
        </button>
      </div>
    </>
  );
}

// Component hiển thị kết quả dự đoán hàng loạt
export function BatchResultsDisplay({ batchResults }) {
  if (!batchResults || batchResults.length === 0) return null;

  return (
    <div className={styles.batchResults}>
      <h3>Kết quả dự đoán ({batchResults.length} mẫu)</h3>
      <div className={styles.tableWrapper}>
        <table className={styles.resultsTable}>
          <thead>
            <tr>
              <th>STT</th>
              <th>Kết quả</th>
              {batchResults[0].hasOwnProperty('probability') && <th>Xác suất</th>}
            </tr>
          </thead>
          <tbody>
            {batchResults.map((result, index) => (
              <tr key={index} className={result.prediction.includes('Disease') ? styles.diseaseRow : styles.healthyRow}>
                <td>{index + 1}</td>
                <td>{result.prediction}</td>
                {result.hasOwnProperty('probability') && 
                  <td>{result.probability ? `${(result.probability * 100).toFixed(2)}%` : 'N/A'}</td>
                }
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.downloadSection}>
        <button 
          className={styles.downloadButton}
          onClick={() => downloadCSV(batchResults)}
        >
          Tải kết quả (CSV)
        </button>
      </div>
    </div>
  );
}

// Hàm xuất kết quả ra file CSV
function downloadCSV(results) {
  // Tạo header dựa trên dữ liệu có sẵn
  const headers = ['STT', 'Kết quả'];
  if (results[0].hasOwnProperty('probability')) {
    headers.push('Xác suất');
  }
  
  // Tạo nội dung CSV
  let csvContent = headers.join(',') + '\n';
  
  results.forEach((result, index) => {
    const row = [
      index + 1,
      `"${result.prediction}"`, // Đặt trong dấu ngoặc kép để tránh vấn đề với dấu phẩy
    ];
    
    if (result.hasOwnProperty('probability')) {
      row.push(result.probability ? (result.probability * 100).toFixed(2) + '%' : 'N/A');
    }
    
    csvContent += row.join(',') + '\n';
  });
  
  // Tạo blob và download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `ket-qua-du-doan-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default PredictionForm;