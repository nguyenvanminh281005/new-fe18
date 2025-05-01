import React from 'react';
import styles from '../../../css/Home.module.css';

const HomeContent = () => (
  <>
    <section className={styles.introSection}>
      <h2>Về Dự Án</h2>
      <p>
        Đây là ứng dụng dự đoán nguy cơ mắc bệnh Parkinson dựa trên các dữ liệu y tế và hành vi.
        Mục tiêu là hỗ trợ phát hiện sớm giúp cải thiện chất lượng cuộc sống cho người bệnh.
      </p>
    </section>

    <section className={styles.featuresSection}>
      <h2>Tính Năng Nổi Bật</h2>
      <ul>
        <li>Dự đoán nguy cơ bệnh Parkinson nhanh chóng và chính xác</li>
        <li>Quản lý hồ sơ cá nhân và lịch sử dự đoán</li>
        <li>Giao diện thân thiện, dễ sử dụng</li>
        <li>Hỗ trợ tư vấn và thông tin y tế liên quan</li>
      </ul>
    </section>

    <section className={styles.quickStartSection}>
      <h2>Bắt Đầu Như Thế Nào?</h2>
      <ol>
        <li>Đăng ký tài khoản hoặc đăng nhập</li>
        <li>Điền thông tin cần thiết để dự đoán</li>
        <li>Xem kết quả và nhận tư vấn phù hợp</li>
        <li>Quản lý hồ sơ và theo dõi tiến trình sức khỏe</li>
      </ol>
    </section>

    <section className={styles.testimonialsSection}>
      <h2>Phản Hồi Người Dùng</h2>
      <blockquote>
        "Ứng dụng rất hữu ích, giúp tôi và gia đình yên tâm hơn về sức khỏe." - Anh Minh
      </blockquote>
      <blockquote>
        "Giao diện dễ dùng, kết quả dự đoán nhanh và chính xác." - Chị Thi
      </blockquote>
    </section>
  </>
);

export default HomeContent;
