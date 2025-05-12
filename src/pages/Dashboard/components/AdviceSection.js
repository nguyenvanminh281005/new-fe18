// AdviceSection.js
import React, { useState } from 'react';
import axios from 'axios';
import styles from '../../../css/Dashboard.module.css';

function AdviceSection({ features, result, currentUser }) {
  const [adviceList, setAdviceList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adviceError, setAdviceError] = useState('');

  const handleGetAdvice = async () => {
    try {
      setAdviceList([]);
      setAdviceError('');
      setLoading(true);

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/get_advice`, {
        features: features.map(Number),
        prediction: result,   // <-- Không cần đổi sang 1/0 nữa
        userId: currentUser?.id || null
      });

      const { advice, error } = response.data;

      if (error) {
        setAdviceError(error);
      } else if (Array.isArray(advice)) {
        setAdviceList(advice);
      } else {
        setAdviceError('Dữ liệu lời khuyên trả về không hợp lệ.');
      }

    } catch (error) {
      console.error('Lỗi khi lấy lời khuyên:', error);
      setAdviceError('Không thể lấy lời khuyên từ chuyên gia.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.adviceSection}>
      {result === 'Disease Detected' && (
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

      {adviceList.length > 0 && (
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
