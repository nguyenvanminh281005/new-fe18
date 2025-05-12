import React from 'react';
import styles from '../../css/About.module.css';
import { Activity, ShieldAlert, ArrowDownUp, AlertTriangle, Mic2, PenTool } from 'lucide-react';

const symptoms = [
  {
    icon: <Activity size={40} />,
    title: 'Run rẩy (Tremor)',
    description: 'Thường bắt đầu ở tay hoặc chân khi nghỉ ngơi, có thể lan ra các phần khác của cơ thể.',
  },
  {
    icon: <ShieldAlert size={40} />,
    title: 'Cứng cơ (Rigidity)',
    description: 'Cơ bị căng cứng, gây đau và hạn chế cử động.',
  },
  {
    icon: <ArrowDownUp size={40} />,
    title: 'Chậm vận động (Bradykinesia)',
    description: 'Giảm khả năng di chuyển và phản xạ, gây khó khăn trong sinh hoạt hàng ngày.',
  },
  {
    icon: <AlertTriangle size={40} />,
    title: 'Mất thăng bằng',
    description: 'Gây khó khăn khi đứng hoặc đi lại, dễ té ngã.',
  },
  {
    icon: <Mic2 size={40} />,
    title: 'Thay đổi giọng nói',
    description: 'Giọng nói yếu, đơn điệu, hoặc khó nghe.',
  },
  {
    icon: <PenTool size={40} />,
    title: 'Khó viết chữ',
    description: 'Chữ viết nhỏ lại và khó đọc (micrographia).',
  },
];

const steps = [
  'Kiểm tra lâm sàng bởi bác sĩ chuyên khoa.',
  'Chụp MRI để loại trừ các nguyên nhân khác.',
  'Đánh giá triệu chứng qua các bài kiểm tra vận động.',
  'Xét nghiệm máu (để loại trừ các bệnh lý khác).',
  'Theo dõi đáp ứng với thuốc điều trị dopamine.',
];

const treatments = [
  'Sử dụng thuốc như Levodopa để cải thiện triệu chứng.',
  'Tập vật lý trị liệu để duy trì khả năng vận động.',
  'Hỗ trợ tâm lý và dinh dưỡng hợp lý.',
  'Phẫu thuật kích thích não sâu (DBS) trong một số trường hợp nặng.',
];

const faqs = [
  {
    question: 'Bệnh Parkinson có di truyền không?',
    answer: 'Một số trường hợp có yếu tố di truyền, nhưng đa phần là do yếu tố môi trường và lão hóa.',
  },
  {
    question: 'Tôi có thể sống bao lâu nếu mắc bệnh?',
    answer: 'Với điều trị đúng cách, người bệnh vẫn có thể sống lâu và duy trì chất lượng cuộc sống.',
  },
  {
    question: 'Bệnh Parkinson có chữa khỏi hoàn toàn không?',
    answer: 'Hiện chưa có cách chữa khỏi hoàn toàn, nhưng các phương pháp điều trị có thể kiểm soát tốt triệu chứng.',
  },
];

const AboutMain = () => {
  return (
    <div className={styles.aboutContainer}>
      <section className={styles.section}>
        <h2 className={styles.title}>Triệu chứng của bệnh Parkinson</h2>
        <div className={styles.symptomList}>
          {symptoms.map((symptom, index) => (
            <div key={index} className={styles.symptomCard}>
              <div className={styles.symptomIcon}>{symptom.icon}</div>
              <h3 className={styles.symptomTitle}>{symptom.title}</h3>
              <p className={styles.symptomDescription}>{symptom.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.title}>Quy trình chẩn đoán</h2>
        <ol className={styles.diagnosisList}>
          {steps.map((step, index) => (
            <li key={index} className={styles.diagnosisStep}>{step}</li>
          ))}
        </ol>
      </section>

      <section className={styles.section}>
        <h2 className={styles.title}>Phương pháp điều trị</h2>
        <ul className={styles.treatmentList}>
          {treatments.map((treatment, index) => (
            <li key={index} className={styles.treatmentItem}>{treatment}</li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.title}>Câu hỏi thường gặp</h2>
        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <div key={index} className={styles.faqItem}>
              <details>
                <summary className={styles.faqQuestion}>{faq.question}</summary>
                <p className={styles.faqAnswer}>{faq.answer}</p>
              </details>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutMain;
