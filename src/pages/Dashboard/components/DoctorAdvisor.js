import React from 'react';
import styles from '../../../css/Dashboard.module.css';
import { motion } from 'framer-motion';
import doctorImg from '../../../assets/doctor.webp'; // bạn cần đặt ảnh tại đây

function DoctorAdvisor({ isPositive }) {
  const adviceText = isPositive
    ? 'Tôi khuyên bạn nên thăm khám bác sĩ chuyên khoa để được chẩn đoán chính xác và điều trị kịp thời.'
    : 'Tốt lắm! Nhưng đừng quên duy trì lối sống lành mạnh và kiểm tra sức khỏe định kỳ nhé.';

  return (
    <motion.div
      className={styles.doctorBox}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <img src={doctorImg} alt="Doctor Advisor" className={styles.doctorImg} />
      <div className={styles.doctorSpeech}>
        <p>{adviceText}</p>
      </div>
    </motion.div>
  );
}

export default DoctorAdvisor;
