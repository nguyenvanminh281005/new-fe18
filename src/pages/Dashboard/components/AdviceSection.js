// AdviceSection.js
import React, { useState } from 'react';
import axios from 'axios';
import styles from '../../../css/Dashboard.module.css';

function AdviceSection({ features, result, currentUser }) {
  const [adviceList, setAdviceList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adviceError, setAdviceError] = useState('');

// Trong AdviceSection.js, sửa hàm handleGetAdvice
  const handleGetAdvice = async () => {
    try {
      setAdviceList([]);
      setAdviceError('');
      setLoading(true);
      
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/get_advice`, {
        features: features.map(Number),
        prediction: result === 'Parkinson Detected' ? 1 : 0,
        userId: currentUser?.id || null
      });
      
      // Kiểm tra nếu response có lỗi
      if (response.data.error) {
        setAdviceError(response.data.error);
        return;
      }
      
      // Kiểm tra xem advice có phải là mảng hợp lệ
      if (Array.isArray(response.data.advice)) {
        setAdviceList(response.data.advice);
      } else if (typeof response.data.advice === 'string') {
        try {
          // Thử parse nếu là string
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
      } else {
        setAdviceError('Không nhận được dữ liệu lời khuyên hợp lệ');
      }
      
    } catch (error) {
      console.error('Lỗi khi lấy lời khuyên:', error);
      setAdviceError(`Không thể lấy lời khuyên: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.adviceSection}>
      {result === 'Parkinson Detected' && (
        <button 
          className={styles.adviceButton}
          onClick={handleGetAdvice}
          disabled={loading}
        >
          {loading ? 'Đang xử lý...' : 'Nhận lời khuyên từ chuyên gia'}
        </button>
      )}
      
      {loading && <p className={styles.loadingText}>Đang tải lời khuyên...</p>}
      
      {adviceError && <div className={styles.adviceErrorBox}>{adviceError}</div>}
      
      {adviceList && adviceList.length > 0 && (
        <div className={styles.adviceBox}>
          <h3>Lời khuyên từ chuyên gia:</h3>
          <ul>
            {adviceList.map((advice, index) => (
              <li key={index} style={{ marginBottom: '1em' }}>
                <strong>{advice.title}</strong>
                <p>{advice.details}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AdviceSection;