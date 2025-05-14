import React, { useState } from 'react';
import Papa from 'papaparse';
import styles from '../../../css/Dashboard.module.css';

function FileUploadPredict({ selectedModel }) {
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      setError('Chỉ chấp nhận file CSV.');
      return;
    }

    Papa.parse(file, {
      complete: async (result) => {
        const data = result.data.filter(row => row.length > 0 && row.some(val => val.trim() !== ''));
        if (data.length < 1) {
          setError('File không chứa dữ liệu hợp lệ.');
          return;
        }

        const featureList = data.map(row => row.map(parseFloat));
        if (featureList.some(row => row.length !== 10)) {
          setError('Mỗi dòng phải chứa đúng 10 giá trị.');
          return;
        }

        setLoading(true);
        try {
          const response = await axios.post(`${process.env.REACT_APP_API_URL}/predict-batch`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ model: selectedModel, features_list: featureList })
          });

          const result = await response.json();
          if (response.ok) {
            setResults(result.results);
            setError('');
          } else {
            setError(result.error || 'Có lỗi xảy ra.');
          }
        } catch (err) {
          setError('Không thể gửi yêu cầu.');
        } finally {
          setLoading(false);
        }
      }
    });
  };

  return (
    <div className={styles.fileUploadSection}>
      <label htmlFor="csvUpload">Tải lên file CSV:</label>
      <input type="file" id="csvUpload" accept=".csv" onChange={handleFileChange} />
      {error && <p className={styles.error}>{error}</p>}
      {loading && <p>Đang dự đoán...</p>}

      {results.length > 0 && (
        <table className={styles.resultTable}>
          <thead>
            <tr>
              <th>STT</th>
              <th>Kết quả dự đoán</th>
            </tr>
          </thead>
          <tbody>
            {results.map((res, idx) => (
              <tr key={idx}>
                <td>{res.index + 1}</td>
                <td>{res.prediction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default FileUploadPredict;