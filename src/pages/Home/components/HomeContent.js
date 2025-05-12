import React from 'react';
import styles from '../../../css/Home.module.css';

const HomeContent = () => (
  <>
    <section className={styles.introSection}>
      <h2>Về Dự Án</h2>
      <p>
        Ứng dụng này là một hệ thống hỗ trợ đánh giá nguy cơ bệnh Alzheimer, được phát triển dựa trên
        các nghiên cứu từ các tổ chức y tế hàng đầu như Viện Y tế Quốc gia Hoa Kỳ (NIH) và Hiệp hội
        Alzheimer Quốc tế. Sử dụng công nghệ học máy tiên tiến, chúng tôi cung cấp một công cụ đáng tin cậy
        để người dùng theo dõi sức khỏe trí não, nhằm phát hiện sớm nguy cơ và hỗ trợ các biện pháp phòng
        ngừa, từ đó nâng cao chất lượng cuộc sống.
      </p>
    </section>

    <section className={styles.featuresSection}>
      <h2>Tính Năng Nổi Bật</h2>
      <ul>
        <li>Dự đoán nguy cơ Alzheimer dựa trên các chỉ số y khoa và yếu tố nguy cơ được nghiên cứu</li>
        <li>Quản lý hồ sơ sức khỏe cá nhân, theo dõi sự thay đổi về nhận thức qua thời gian</li>
        <li>Giao diện trực quan, dễ sử dụng cho mọi lứa tuổi, đặc biệt là người cao tuổi</li>
        <li>Cung cấp gợi ý phòng ngừa và tư vấn dựa trên khuyến nghị từ các chuyên gia y tế</li>
        <li>Bảo mật dữ liệu người dùng theo tiêu chuẩn GDPR và HIPAA</li>
      </ul>
    </section>

    <section className={styles.quickStartSection}>
      <h2>Hướng Dẫn Sử Dụng</h2>
      <ol>
        <li>Đăng ký hoặc đăng nhập bằng thông tin cá nhân</li>
        <li>Nhập các thông tin sức khỏe và trả lời bảng câu hỏi về nhận thức</li>
        <li>Nhận kết quả dự đoán nguy cơ Alzheimer ngay sau khi hệ thống phân tích</li>
        <li>Lưu kết quả và tham khảo các khuyến nghị để chăm sóc sức khỏe trí não</li>
      </ol>
    </section>

    <section className={styles.testimonialsSection}>
      <h2>Phản Hồi Từ Người Dùng</h2>
      <blockquote>
        "Ứng dụng giúp tôi hiểu rõ hơn về nguy cơ Alzheimer và khuyến khích tôi thay đổi lối sống để bảo vệ sức khỏe trí não."
        <br />– Ông Hùng, 62 tuổi, giáo viên nghỉ hưu
      </blockquote>
      <blockquote>
        "Giao diện thân thiện và kết quả dễ hiểu. Tôi cảm thấy yên tâm khi sử dụng công cụ này để theo dõi sức khỏe cho bố mẹ."
        <br />– Chị Lan, 38 tuổi, nhân viên ngân hàng
      </blockquote>
    </section>
  </>
);

export default HomeContent;