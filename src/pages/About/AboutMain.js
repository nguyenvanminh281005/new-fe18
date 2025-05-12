import React from 'react';
import styles from '../../css/About.module.css';
import { Activity, ShieldAlert, ArrowDownUp, AlertTriangle, Mic2, PenTool } from 'lucide-react';

const symptoms = [
  {
    icon: <AlertTriangle size={40} />,
    title: 'Suy giảm trí nhớ',
    description: 'Khó nhớ các sự kiện gần đây, lặp lại câu hỏi hoặc quên thông tin vừa học.',
  },
  {
    icon: <Activity size={40} />,
    title: 'Khó khăn trong tư duy',
    description: 'Gặp vấn đề khi lập kế hoạch, giải quyết vấn đề hoặc xử lý các con số.',
  },
  {
    icon: <PenTool size={40} />,
    title: 'Thay đổi khả năng viết hoặc nói',
    description: 'Khó tìm từ ngữ, diễn đạt ý tưởng, hoặc viết mạch lạc.',
  },
  {
    icon: <ArrowDownUp size={40} />,
    title: 'Lẫn lộn về thời gian và không gian',
    description: 'Mất phương hướng, không nhận ra nơi quen thuộc hoặc nhầm lẫn thời gian.',
  },
  {
    icon: <ShieldAlert size={40} />,
    title: 'Thay đổi tâm trạng hoặc hành vi',
    description: 'Trở nên lo âu, trầm cảm, hoặc dễ kích động mà không rõ lý do.',
  },
  {
    icon: <Mic2 size={40} />,
    title: 'Khó khăn trong hoạt động hàng ngày',
    description: 'Gặp vấn đề khi thực hiện các công việc quen thuộc như nấu ăn hoặc mặc quần áo.',
  },
];

const steps = [
  'Đánh giá lâm sàng bởi bác sĩ chuyên khoa thần kinh hoặc tâm thần.',
  'Thực hiện các bài kiểm tra nhận thức như MMSE hoặc MoCA.',
  'Chụp CT hoặc MRI để phát hiện thay đổi cấu trúc não.',
  'Xét nghiệm máu để loại trừ các nguyên nhân khác như thiếu vitamin B12.',
  'Thu thập tiền sử bệnh và phỏng vấn gia đình để xác định triệu chứng.',
];

const treatments = [
  'Sử dụng thuốc như Donepezil hoặc Memantine để làm chậm tiến triển triệu chứng.',
  'Tham gia các chương trình kích thích nhận thức và vật lý trị liệu.',
  'Hỗ trợ tâm lý và tư vấn cho bệnh nhân cùng gia đình.',
  'Áp dụng chế độ ăn uống lành mạnh và lối sống tích cực để hỗ trợ sức khỏe não bộ.',
];

const faqs = [
  {
    question: 'Bệnh Alzheimer có di truyền không?',
    answer: 'Một số trường hợp có yếu tố di truyền (như gen APOE-e4), nhưng phần lớn liên quan đến tuổi tác và yếu tố môi trường.',
  },
  {
    question: 'Tôi có thể sống bao lâu nếu mắc bệnh Alzheimer?',
    answer: 'Thời gian sống thay đổi tùy thuộc vào độ tuổi và giai đoạn bệnh, nhưng điều trị sớm có thể cải thiện chất lượng cuộc sống.',
  },
  {
    question: 'Bệnh Alzheimer có chữa khỏi hoàn toàn không?',
    answer: 'Hiện chưa có cách chữa khỏi, nhưng các phương pháp điều trị có thể làm chậm tiến triển và cải thiện triệu chứng.',
  },
];

const AboutMain = () => {
  return (
    <div className={styles.aboutContainer}>
      <section className={styles.section}>
        <h2 className={styles.title}>Triệu chứng của bệnh Alzheimer</h2>
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