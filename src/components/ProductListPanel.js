import { memo } from 'react';
import { Link } from 'react-router-dom';

import '../cssfile/productlistpanel.css';
import { LoadingDiv } from '../pages/LoadingPage';

const ProductListLoading = memo((props) => {
  return (
    <section>
      <div className="custom-container">
        <div className="wrapper">
          <div className="productlist-title-container">
            <div className="productlist-title">{props.sectionTitle}</div>
          </div>
          <LoadingDiv />
          <div className="decorate"></div>
        </div>
      </div>
    </section>
  );
});

const ProductListPanel = memo((props) => {
  return (
    <section>
      <div className="custom-container">
        <div className="wrapper">
          <div className="productlist-title-container">
            <div className="productlist-title">{props.sectionTitle}</div>
          </div>
          <div className="product-list-container">
            {props.productList.map((item, index) => {
              return item.hasOwnProperty('product') ? (
                <ProductCardOnHome
                  key={index}
                  item={item}
                />
              ) : (
                <ProductCardOnCategory
                  key={index}
                  item={item}
                />
              );
            })}
          </div>
          <div className="decorate"></div>
        </div>
      </div>
    </section>
  );
});

const ProductCardOnHome = (props) => {
  return (
    <>
      <div className="product-card">
        <Link
          to={`./product/${props.item.category}/${props.item.product['_id']}`}
          className="product-link">
          <div className="product-image-container">
            {Array.isArray(props.item.product.img) ? (
              <img
                className="product-image-grid"
                src={`assets/${props.item.category}/${props.item.product.img[0]}.webp`}
                alt=""
              />
            ) : (
              <img
                className="product-image-grid"
                src={`assets/${props.item.category}/${props.item.product.img}.webp`}
                alt=""
              />
            )}
          </div>
          <div className="product-description-container">
            <div className="product-name">{props.item.product.name}</div>
            {props.item.product['discount price'] !== 0 ? (
              <>
                <div className="current-price">
                  {props.item.product['discount price'].toLocaleString()}
                  <span className="unit-currency">đ</span>
                </div>
                <span className="original-price">
                  {props.item.product.price.toLocaleString()}
                  <span className="unit-currency-small">đ</span>
                </span>
                <span className="sale-percent">
                  -
                  {Math.round(
                    ((props.item.product.price -
                      props.item.product['discount price']) *
                      100) /
                      props.item.product.price,
                  )}
                  %
                </span>
              </>
            ) : (
              <div className="current-price">
                {props.item.product.price.toLocaleString()}
                <span className="unit-currency">đ</span>
              </div>
            )}
          </div>
        </Link>
      </div>
    </>
  );
};

const ProductCardOnCategory = (props) => {
  return (
    <>
      <div className="product-card">
        <Link
          to={`/product/${props.item.category}/${props.item['_id']}`}
          className="product-link">
          <div className="product-image-container">
            {Array.isArray(props.item.img) ? (
              <img
                className="product-image-grid"
                src={`/assets/${props.item.category}/${props.item.img[0]}.webp`}
                alt=""
              />
            ) : (
              <img
                className="product-image-grid"
                src={`/assets/${props.item.category}/${props.item.img}.webp`}
                alt=""
              />
            )}
          </div>
          <div className="product-description-container">
            <div className="product-name">{props.item.name}</div>
            {props.item['discount price'] !== 0 ? (
              <>
                <div className="current-price">
                  {props.item['discount price'].toLocaleString()}
                  <span className="unit-currency">đ</span>
                </div>
                <span className="original-price">
                  {props.item.price.toLocaleString()}
                  <span className="unit-currency-small">đ</span>
                </span>
                <span className="sale-percent">
                  -
                  {Math.round(
                    ((props.item.price - props.item['discount price']) * 100) /
                      props.item.price,
                  )}
                  %
                </span>
              </>
            ) : (
              <div className="current-price">
                {props.item.price.toLocaleString()}
                <span className="unit-currency">đ</span>
              </div>
            )}
          </div>
        </Link>
      </div>
    </>
  );
};
export { ProductListPanel, ProductListLoading };
