import React from 'react';
import styles from '../../../css/Home.module.css';

const HomeContent = () => (
  <>
    <section className={styles.introSection}>
      <h2>Về Dự Án</h2>
      <p>
        Ứng dụng này là một hệ thống hỗ trợ chẩn đoán sớm bệnh Parkinson, được phát triển dựa trên
        các nghiên cứu y học và mô hình học máy hiện đại. Mục tiêu của chúng tôi là cung cấp một công cụ
        tin cậy giúp người dùng theo dõi và đánh giá nguy cơ mắc bệnh, từ đó nâng cao chất lượng cuộc sống
        và hỗ trợ kịp thời cho quá trình điều trị.
      </p>
    </section>

    <section className={styles.featuresSection}>
      <h2>Tính Năng Nổi Bật</h2>
      <ul>
        <li>Phân tích và dự đoán nguy cơ Parkinson dựa trên dữ liệu y học</li>
        <li>Lưu trữ và quản lý hồ sơ cá nhân, theo dõi tiến triển sức khỏe</li>
        <li>Giao diện thân thiện, dễ sử dụng cho mọi đối tượng</li>
        <li>Tư vấn sức khỏe tổng quan dựa trên kết quả dự đoán</li>
        <li>Cam kết bảo mật và an toàn tuyệt đối cho dữ liệu người dùng</li>
      </ul>
    </section>

    <section className={styles.quickStartSection}>
      <h2>Hướng Dẫn Sử Dụng</h2>
      <ol>
        <li>Đăng ký tài khoản hoặc đăng nhập bằng thông tin cá nhân</li>
        <li>Điền các chỉ số sức khỏe theo hướng dẫn trong biểu mẫu</li>
        <li>Hệ thống xử lý và hiển thị kết quả dự đoán ngay lập tức</li>
        <li>Lưu trữ kết quả và nhận gợi ý tư vấn y tế phù hợp</li>
      </ol>
    </section>

    <section className={styles.testimonialsSection}>
      <h2>Phản Hồi Từ Người Dùng</h2>
      <blockquote>
        "Nhờ ứng dụng này, tôi có thể kiểm soát sức khỏe của mình tốt hơn và yên tâm hơn về nguy cơ mắc Parkinson."
        <br />– Anh Minh, 15 tuổi
      </blockquote>
      <blockquote>
        "Ứng dụng rất dễ sử dụng, giao diện trực quan. Kết quả phân tích nhanh và đáng tin cậy."
        <br />– Chị Thi, nhân viên văn phòng
      </blockquote>
    </section>
  </>
);

export default HomeContent;