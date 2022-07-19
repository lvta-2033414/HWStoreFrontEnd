import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  CLEAR_CART,
  REMOVED_CART_ITEM,
  SET_QUANTITY,
  DECREASE_QUANTITY,
  INCREASE_QUANTITY,
  CALCULATE_TOTAL_AMOUNT,
} from '../actions/CartActions';

import { LoadingDiv } from '../pages/LoadingPage';
import '../cssfile/cartpage.css';

export const CartPage = () => {
  const itemsInCart = useSelector((state) => state.cart);
  return (
    <section className="cart-page">
      <div className="custom-container">
        <div className="cart-section-title">
          <h2>Giỏ hàng</h2>
        </div>
        <div className="cart-layout-container">
          <CartInfo>
            {itemsInCart.length > 0 ? (
              itemsInCart.map((item, index) => (
                <CartItem
                  key={index}
                  product={item}
                />
              ))
            ) : (
              <div className="cart-frame">
                <img
                  src="/assets/noitem.png"
                  alt=""
                  className="empty-cart-image"
                />
                <div className="empty-cart-txt">
                  Giỏ hàng chưa có sản phẩm nào
                </div>
                <div>
                  <Link to="/">
                    <button className="buy-now-in-cart">Mua sắm ngay</button>
                  </Link>
                </div>
              </div>
            )}
          </CartInfo>
          <Payment />
        </div>
      </div>
    </section>
  );
};

const CartInfo = (props) => {
  const dispatch = useDispatch();
  const emptyCartHandler = () => {
    dispatch({ type: CLEAR_CART });
  };
  return (
    <div className="cart-info-section custom-box-shadow">
      <div className="cart-info-header-container">
        <div className="product-name-header cart-info-title">Tên sản phẩm</div>
        <div className="price-per-unit-header cart-info-title">Đơn giá</div>
        <div className="number-of-product-header cart-info-title">Số lượng</div>
        <div className="final-price-header cart-info-title">Thành tiền</div>
      </div>
      <div
        className="cart-empty-button"
        onClick={emptyCartHandler}>
        Xóa tất cả
      </div>
      {props.children}
    </div>
  );
};

const CartItem = ({ product }) => {
  const dispatch = useDispatch();
  const removeCartItem = (id, info) => {
    console.log(id);
    const { price, discountPrice, quantity } = info;
    const amount =
      discountPrice > 0 ? discountPrice * quantity : price * quantity;
    dispatch({ type: REMOVED_CART_ITEM, payload: { id, amount } });
  };
  const onChangeHandler = (event, id) => {
    const regex = /^[0-9]+$/;
    let quantity = parseInt(event.target.value);
    if (!event.target.value.match(regex) || quantity === 0) {
      quantity = 1;
    }
    if (quantity > 20) {
      quantity = 20;
    }
    dispatch({ type: SET_QUANTITY, payload: { quantity, id } });
  };
  const plusButtonHandler = (id, info) => {
    const { price, discountPrice } = info;
    const amount = discountPrice > 0 ? discountPrice : price;
    dispatch({ type: INCREASE_QUANTITY, payload: { id, amount } });
  };
  const minusButtonHandler = (id, info) => {
    const { price, discountPrice } = info;
    const amount = discountPrice > 0 ? discountPrice : price;
    dispatch({ type: DECREASE_QUANTITY, payload: { id, amount } });
  };
  const { id, category, name, img, price, discountPrice, quantity } = product;
  useEffect(() => {
    dispatch({ type: CALCULATE_TOTAL_AMOUNT });
  }, []);
  return (
    <div className="cart-info-content-container">
      <div className="cart-item-container">
        <Link to={`/product/${category}/${id}`}>
          <div className="cart-item-image-section">
            <img
              className="cart-item-image"
              src={`/assets/${category}/${img}.webp`}
              alt=""
            />
          </div>
        </Link>
        <Link to={`/product/${category}/${id}`}>
          <div className="cart-item-name-section">{name}</div>
        </Link>
        <div className="price-per-unit-wrapper">
          <div className="abc">
            {discountPrice > 0 ? (
              <>
                <span>{discountPrice.toLocaleString()}</span>
                <span> đ</span>
                <span
                  style={{
                    display: 'inline-block',
                    width: '100%',
                    fontSize: '12px',
                    color: 'grey',
                    textDecoration: 'line-through',
                  }}>
                  {price.toLocaleString()}
                  <span> đ</span>
                </span>
              </>
            ) : (
              <>
                <span>{price.toLocaleString()}</span>
                <span> đ</span>
              </>
            )}
          </div>
        </div>
        <div className="number-of-product-wrapper">
          <span className="change-quantity-background">
            <button
              className="decrease-button"
              onClick={() => {
                minusButtonHandler(id, { price, discountPrice });
              }}
              disabled={quantity < 2 ? true : false}>
              <i className="bi bi-dash"></i>
            </button>
            <input
              className="number-of-product-input"
              type="text"
              value={quantity}
              onChange={(event) => {
                onChangeHandler(event, id);
              }}
            />
            <button
              className="increase-button"
              onClick={() => {
                plusButtonHandler(id, { price, discountPrice });
              }}
              disabled={quantity === 20 ? true : false}>
              <i className="bi bi-plus"></i>
            </button>
          </span>

          <div
            className="delete-product-button"
            onClick={() =>
              removeCartItem(id, { price, discountPrice, quantity })
            }>
            Xóa
          </div>
        </div>
        <div className="total-price-wrapper">
          <span>
            {discountPrice > 0
              ? (discountPrice * quantity).toLocaleString()
              : (price * quantity).toLocaleString()}
          </span>
          <span> đ</span>
        </div>
      </div>
    </div>
  );
};

const Payment = () => {
  const totalAmount = useSelector((state) => state.total_amount);
  return (
    <div className="payment-section custom-box-shadow">
      <div className="payment-section-title">Thanh toán</div>
      <div className="payment-content-layout-wrapper">
        <div className="payment-title--small">Tạm tính</div>
        <div className="temp-price">
          {totalAmount.toLocaleString()}
          <span> đ</span>
        </div>
        <div className="payment-title--small">Thành tiền</div>
        <div className="payment-price-container">
          <div className="total-price--red">
            {totalAmount.toLocaleString()}
            <span> đ</span>
          </div>
          <div className="vat-txt">(Đã bao gồm VAT)</div>
        </div>
        <div className="order-button-wrapper">
          <button className="order-button">ĐẶT HÀNG</button>
        </div>
      </div>
    </div>
  );
};
