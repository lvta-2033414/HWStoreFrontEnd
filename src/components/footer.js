import React from 'react';
import '../cssfile/footer.css';
export const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="custom-container">
        <div className="footer-section">
          <div className="work-time-container footer-item">
            <div className="work-time-title">THỜI GIAN LÀM VIỆC</div>
            <ul className="work-time">
              CN Quận 10
              <li>Thứ 2 – Thứ 7: 08:30 – 20:30</li>
              <li>Chủ Nhật: 09:00 – 12:30 / 13:30 – 17:30</li>
            </ul>
            <ul className="work-time-2">
              Bảo Hành: Thứ 2 – Thứ 7<li>Sáng: 08:30 – 12:00</li>
              <li>Chiều: 13:30 – 18:00</li>
            </ul>
          </div>
          <div className="contact-info-container footer-item">
            <div className="contact-info-title">THÔNG TIN LIÊN HỆ</div>
            <div className="contact-info-section-1">
              <div>
                <span className="contact-info-title-2">Showrom: </span>
                222 Trường Chinh, Quận 12
              </div>
              <div>
                <span className="contact-info-title-2">Hotline: </span>
                1900 888 999
              </div>
            </div>
            <div className="contact-info-section-2">
              <div>
                <span className="contact-info-title-2">Bảo Hành: </span>
                <a href="tel:+84 111222">(028) 111 222</a>
              </div>
              <div>
                <span className="contact-info-title-2">Kinh Doanh: </span>
                (028) 333 444
              </div>
              <div>
                <span className="contact-info-title-2">Kỹ Thuật: </span>
                (028) 555 666
              </div>
            </div>
            <div className="contact-info-section-3">
              <div>
                <span className="contact-info-title-2">CSKH: </span>
                cskh@hwstore.vn
              </div>
              <div>
                <span className="contact-info-title-2">Kinh Doanh: </span>
                kinhdoanh@hwstore.vn
              </div>
              <div>
                <span className="contact-info-title-2">Liên Hệ: </span>
                info@hwstore.vn
              </div>
            </div>
          </div>
          <div className="additional-info-container footer-item">
            <div className="additional-info-title">THÔNG TIN BỔ SUNG</div>
            <ul className="additional-info-list">
              <li className="additional-info-item">
                <a href="/">Chính sách bảo hành</a>
              </li>
              <li className="additional-info-item">
                <a href="/">Chính sách vận chuyển</a>
              </li>
              <li className="additional-info-item">
                <a href="/">Chính sách đổi trả hàng</a>
              </li>
              <li className="additional-info-item">
                <a href="/">Phương thức thanh toán</a>
              </li>
            </ul>
          </div>
          <div className="social-platform-container footer-item">
            <div className="social-platform-title">MẠNG XÃ HỘI</div>
            <a
              className="social-icon"
              href="/">
              <i className="bi bi-facebook"></i>
            </a>
            <a
              className="social-icon"
              href="/">
              <i className="bi bi-youtube"></i>
            </a>
            <a
              className="social-icon"
              href="/">
              <i className="bi bi-telegram"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
