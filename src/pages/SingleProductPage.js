import { useState, useEffect, memo, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import getProduct from '../api/getOneProduct';

import { Gallery } from '../components';
import { LoadingPage } from './LoadingPage';

import '../cssfile/singleproductpage.css';

const product = {
  category: 'cpu',
  warranty: '36 tháng',
  brand: 'AMD',
  productID: 'Ryzen 9-5950X',
  price: 16500000,
  'discount price': 0,
  img: 'R9',
  Name: 'Ryzen 9 - 5950X',
  Socket: 'AM4',
  Core: 16,
  Thread: 32,
  'Base Freq': '3.4 GHz',
  'Boost Freq': '4.9 GHz',
  'L2 cache': '8 MB',
  'L3 cahe': '64 MB',
  TDP: '105 W',
};

export const SingleProductPage = memo(() => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const isLoading = useRef(true);
  useEffect(() => {
    const fetchProduct = async () => {
      const product = await getProduct(params.category, params.id);
      setProduct(product);
      if (!product.hasOwnProperty('msg')) {
        isLoading.current = false;
      }
    };
    fetchProduct();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  if (isLoading.current) {
    return <LoadingPage />;
  } else {
    return (
      <section
        className="detail-product-page"
        style={{ marginTop: '150px' }}>
        <div className="custom-container">
          <div className="product-display-and-side-info-container">
            <div className="product-display-section">
              <div className="product-slider-container">
                <Gallery
                  images={product.img}
                  category={product.category}
                />
              </div>
              <div className="product-name-and-price-container">
                <div>
                  <h1 className="name-of-product">{product.name}</h1>
                </div>
                <div className="brand-container">
                  Thương hiệu{' '}
                  <span className="brand-name">{product.brand}</span>
                </div>
                {product['discount price'] !== 0 ? (
                  <div className="current-price">
                    {product['discount price'].toLocaleString()}
                    <span className="unit-currency">đ</span>
                  </div>
                ) : (
                  <div className="current-price">
                    {product.price.toLocaleString()}
                    <span className="unit-currency">đ</span>
                  </div>
                )}
                {product['discount price'] !== 0 ? (
                  <span className="original-price">
                    {product.price.toLocaleString()}
                    <span className="unit-currency-small">đ</span>
                  </span>
                ) : (
                  <span className="original-price" />
                )}
                <div className="buy-button-container">
                  <button className="buy-now-button">MUA NGAY</button>
                  <button className="add-to-cart-button">
                    THÊM VÀO GIỎ HÀNG
                  </button>
                </div>
                <ProductSpec product={product} />
              </div>
            </div>
            <SideInfoPanel />
          </div>
        </div>
        {/* <div>Notify Panel</div> */}
      </section>
    );
  }
});

const ProductSpec = memo((props) => {
  return (
    <>
      <div className="specs-of-product-outer-container">
        <div className="specs-title">Thông tin chi tiết</div>
        <div className="specs-content-container">
          <div className="specs-content-flex-container">
            <div className="specs-name bckgr-grey">Tên sản phẩm</div>
            <div className="specs-param bckgr-grey">{props.product.name}</div>
          </div>
          <div className="specs-content-flex-container">
            <div className="specs-name">Bảo hành</div>
            <div className="specs-param">{props.product.warranty}</div>
          </div>
          {Object.getOwnPropertyNames(props.product).map((property, index) => {
            if (index > 8 && index % 2 !== 0) {
              if (property === 'imgSpec') {
                return (
                  <div>
                    <Link
                      to={`/assets/psu/${props.product[property]}.webp`}
                      target="_blank">
                      <img
                        style={{ width: '100%', cursor: 'zoom-in' }}
                        src={`/assets/psu/${props.product[property]}.webp`}
                        alt=""
                      />
                    </Link>
                  </div>
                );
              }
              return (
                <div
                  key={index}
                  className="specs-content-flex-container">
                  <div className="specs-name bckgr-grey">{property}</div>
                  <div className="specs-param bckgr-grey">
                    {props.product[property]}
                  </div>
                </div>
              );
            } else if (index > 8) {
              return (
                <div
                  key={index}
                  className="specs-content-flex-container">
                  <div className="specs-name">{property}</div>
                  <div className="specs-param">{props.product[property]}</div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
});

const SideInfoPanel = memo(() => {
  return (
    <>
      <div className="side-info-section">
        <div className="side-info-outer-container">
          <div className="side-info-container">
            <div className="side-info-title">Chính sách bán hàng</div>
            <div className="side-info-content-container">
              <div>
                <i className="side-info-icon bi bi-truck"></i>
              </div>
              <div className="side-info-text">
                Miễn phí giao hàng cho đơn hàng từ 800K
              </div>
            </div>
            <div className="side-info-content-container">
              <div>
                <i className="side-info-icon bi bi-shield-check"></i>
              </div>
              <div className="side-info-text">Cam kết hàng chính hãng</div>
            </div>
            <div className="side-info-content-container">
              <div>
                <i className="side-info-icon bi bi-box"></i>
              </div>
              <div className="side-info-text">Đổi trả trong vòng 10 ngày</div>
            </div>
          </div>
          <div className="side-info-container">
            <div className="side-info-title">Dịch vụ khác</div>
            <div className="side-info-content-container">
              <div>
                <i className="side-info-icon bi bi-tools"></i>
              </div>
              <div className="side-info-text">Sửa chữa đồng giá 150.000</div>
            </div>
            <div className="side-info-content-container">
              <div>
                <i className="side-info-icon bi bi-laptop"></i>
              </div>
              <div className="side-info-text">Vệ sinh máy tính, laptop</div>
            </div>
            <div className="side-info-content-container">
              <div>
                <i className="side-info-icon bi bi-shield-check"></i>
              </div>
              <div className="side-info-text">Bảo hành tại nhà</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
