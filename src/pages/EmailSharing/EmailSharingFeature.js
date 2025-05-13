import React, { useState } from 'react';
import axios from 'axios';
import styles from '../../css/EmailSharingFeature.module.css';
import { motion } from 'framer-motion';
import { Mail, Send, User, MessageCircle } from 'lucide-react';

const EmailSharingFeature = ({ predictionData }) => {
  const [email, setEmail] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setStatusMessage('');
    setIsSuccess(false);

    try {
      const predictionResults = {
        features: predictionData.features || [],
        status: predictionData.prediction === 'Disease Detected' ? 'Disease Detected' : 'Healthy',
      };

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/share-results`, {
        recipientEmail: email,
        doctorName: doctorName,
        message: message,
        predictionResults: predictionResults,
      });

      if (response.data.status === 'success') {
        setStatusMessage('✅ Kết quả đã được gửi thành công!');
        setIsSuccess(true);
        setEmail('');
        setDoctorName('');
        setMessage('');
      } else {
        throw new Error(response.data.message || 'Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setStatusMessage(`❌ Có lỗi xảy ra: ${error.message}`);
      setIsSuccess(false);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h3 className={styles.title}>
        <Send size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
        Chia sẻ kết quả với bác sĩ
      </h3>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="doctorName" className={styles.label}>
            <User size={16} style={{ marginRight: '6px' }} />
            Tên bác sĩ:
          </label>
          <input
            type="text"
            id="doctorName"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            placeholder="Nhập tên bác sĩ"
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            <Mail size={16} style={{ marginRight: '6px' }} />
            Email bác sĩ:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="message" className={styles.label}>
            <MessageCircle size={16} style={{ marginRight: '6px' }} />
            Lời nhắn (không bắt buộc):
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Nhập lời nhắn đến bác sĩ..."
            className={styles.textarea}
            rows="4"
          />
        </div>

        <button
          type="submit"
          className={`${styles.button} ${isSending ? styles.buttonDisabled : ''}`}
          disabled={isSending || !predictionData.prediction}
        >
          {isSending ? 'Đang gửi...' : '📤 Gửi kết quả'}
        </button>
      </form>

      {statusMessage && (
        <motion.div 
          className={`${styles.statusMessage} ${isSuccess ? styles.success : styles.error}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {statusMessage}
        </motion.div>
      )}
    </motion.div>
  );
};

export default EmailSharingFeature;
