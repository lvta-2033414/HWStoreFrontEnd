import { useState, useEffect, memo, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import getProduct from '../api/getOneProduct';
import { ADD_TO_CART } from '../actions/CartActions';

import { Gallery } from '../components';
import { LoadingPage } from './LoadingPage';

import '../cssfile/singleproductpage.css';

export const SingleProductPage = memo(() => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const isLoading = useRef(true);
  const dispatch = useDispatch();
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
    const {
      _id,
      category,
      name,
      price,
      'discount price': discountPrice,
    } = product;
    const img = product.img[0];
    const debounce = (callback, wait) => {
      let timeoutId;
      return function () {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(callback, wait);
      };
    };
    const hiddenAddToCartPanel = debounce(() => {
      document
        .querySelector('.added-to-cart-panel')
        .classList.remove('display-panel');
    }, 2500);
    const addToCartHandler = () => {
      dispatch({
        type: ADD_TO_CART,
        payload: {
          id: _id,
          category,
          price,
          discountPrice,
          img,
          name,
          quantity: 1,
        },
      });
      const addToCartPanel = document.querySelector('.added-to-cart-panel');
      if (!addToCartPanel.classList.contains('display-panel')) {
        addToCartPanel.classList.add('display-panel');
        hiddenAddToCartPanel();
      } else {
        addToCartPanel.style.opacity = 0;
        setTimeout(() => (addToCartPanel.style.opacity = 1), 200);
        hiddenAddToCartPanel();
      }
    };
    return (
      <section className="detail-product-page">
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
                  Th????ng hi???u{' '}
                  <span className="brand-name">{product.brand}</span>
                </div>
                {product['discount price'] !== 0 ? (
                  <div className="current-price">
                    {product['discount price'].toLocaleString()}
                    <span className="unit-currency">??</span>
                  </div>
                ) : (
                  <div className="current-price">
                    {product.price.toLocaleString()}
                    <span className="unit-currency">??</span>
                  </div>
                )}
                {product['discount price'] !== 0 ? (
                  <span className="original-price">
                    {product.price.toLocaleString()}
                    <span className="unit-currency-small">??</span>
                  </span>
                ) : (
                  <span className="original-price" />
                )}
                <div className="buy-button-container">
                  <Link
                    to="/cart"
                    className="buy-now-link">
                    <button className="buy-now-button">MUA NGAY</button>
                  </Link>
                  <button
                    className="add-to-cart-button"
                    onClick={addToCartHandler}>
                    TH??M V??O GI??? H??NG
                  </button>
                </div>
                <ProductSpec product={product} />
              </div>
            </div>
            <SideInfoPanel />
          </div>
        </div>
      </section>
    );
  }
});

const ProductSpec = memo((props) => {
  return (
    <>
      <div className="specs-of-product-outer-container">
        <div className="specs-title">Th??ng tin chi ti???t</div>
        <div className="specs-content-container">
          <div className="specs-content-flex-container">
            <div className="specs-name bckgr-grey">T??n s???n ph???m</div>
            <div className="specs-param bckgr-grey">{props.product.name}</div>
          </div>
          <div className="specs-content-flex-container">
            <div className="specs-name">B???o h??nh</div>
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
            <div className="side-info-title">Ch??nh s??ch b??n h??ng</div>
            <div className="side-info-content-container">
              <div>
                <i className="side-info-icon bi bi-truck"></i>
              </div>
              <div className="side-info-text">
                Mi???n ph?? giao h??ng cho ????n h??ng t??? 800K
              </div>
            </div>
            <div className="side-info-content-container">
              <div>
                <i className="side-info-icon bi bi-shield-check"></i>
              </div>
              <div className="side-info-text">Cam k???t h??ng ch??nh h??ng</div>
            </div>
            <div className="side-info-content-container">
              <div>
                <i className="side-info-icon bi bi-box"></i>
              </div>
              <div className="side-info-text">?????i tr??? trong v??ng 10 ng??y</div>
            </div>
          </div>
          <div className="side-info-container">
            <div className="side-info-title">D???ch v??? kh??c</div>
            <div className="side-info-content-container">
              <div>
                <i className="side-info-icon bi bi-tools"></i>
              </div>
              <div className="side-info-text">S???a ch???a ?????ng gi?? 150.000</div>
            </div>
            <div className="side-info-content-container">
              <div>
                <i className="side-info-icon bi bi-laptop"></i>
              </div>
              <div className="side-info-text">V??? sinh m??y t??nh, laptop</div>
            </div>
            <div className="side-info-content-container">
              <div>
                <i className="side-info-icon bi bi-shield-check"></i>
              </div>
              <div className="side-info-text">B???o h??nh t???i nh??</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
