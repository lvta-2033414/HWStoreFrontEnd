import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { GlobalContext } from '../store/GlobalState';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { RegisterForm } from './RegisterForm';

import '../cssfile/navibar.css';

const Logo = () => {
  const Context = useContext(ToggleContext);
  const firstRender = useRef(false);
  const location = useLocation();

  const trackScroll = useRef(function () {
    if (window.innerWidth > 992) {
      if (window.scrollY > 10) {
        Context.setHiddenHamburgerMenu(false);
      } else {
        Context.setHiddenHamburgerMenu(true);
      }
    }
  });
  useEffect(() => {
    if (window.location.pathname === '/') {
      document.addEventListener('scroll', trackScroll.current);
    } else {
      Context.setHiddenHamburgerMenu(false);
    }
  }, []);

  useEffect(() => {
    if (firstRender.current && window.location.pathname === '/') {
      Context.setHiddenHamburgerMenu(true);
      document.addEventListener('scroll', trackScroll.current);
    }
  }, [location]);

  useEffect(() => {
    if (firstRender.current && window.location.pathname !== '/') {
      document.removeEventListener('scroll', trackScroll.current);
      Context.setHiddenHamburgerMenu(false);
    }
  }, [location]);

  useEffect(() => {
    firstRender.current = true;
  }, []);

  return (
    <div className="logo">
      <i className="logo-icon bi bi-pc-display"></i>
      {Context.hiddenHamburgerMenu ? <LogoText /> : <span />}
    </div>
  );
};

const LogoText = () => {
  useEffect(() => {
    setTimeout(() => {
      if (document.querySelector('.logo-text')) {
        document.querySelector('.logo-text').style.opacity = '1';
      }
    }, 20);
  });
  return <span className="logo-text">HW Store</span>;
};

const HambergurMenu = () => {
  const Context = useContext(ToggleContext);
  const hiddenToggle = useContext(GlobalContext);
  useEffect(() => {
    if (document.querySelector('.hamburger-menu-button')) {
      setTimeout(() => {
        document.querySelector('.hamburger-menu-button').style.opacity = '1';
      }, 20);
    }
  });
  return (
    <>
      {Context.hiddenHamburgerMenu ? null : (
        <div
          className="hamburger-menu-button"
          onClick={hiddenToggle.isHiddenHandler}>
          <i className="bi bi-list hamburger-menu-icon"></i>
          Danh mục sản phẩm
        </div>
      )}
    </>
  );
};

const navIconContent = [
  { icon: 'nav-icon bi bi-newspaper', title: 'TIN TỨC' },
  { icon: 'nav-icon bi bi-credit-card-2-back', title: 'THANH TOÁN' },
  { icon: 'nav-icon bi bi-tools', title: 'BẢO HÀNH' },
  { icon: 'nav-icon bi bi-envelope', title: 'LIÊN HỆ' },
];

const MainNavIcon = ({ handleClickOpen }) => {
  const cart = useSelector((state) => state.cartReducer.cart);
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  return (
    <ul className="main-nav-icon-list">
      {navIconContent.map((item, index) => {
        return (
          <li
            key={index}
            className="main-nav-icon">
            <Link
              to="/"
              className="nav-item-link">
              <i className={item.icon}></i>
              <span className="nav-icon-title">{item.title}</span>
            </Link>
          </li>
        );
      })}
      <li className="main-nav-icon">
        <div
          className="nav-item-link"
          onClick={handleClickOpen}>
          <i className="nav-icon bi bi-person-circle"></i>
          <span className="sign-in-button nav-icon-title">ĐĂNG NHẬP</span>
        </div>
      </li>
      <li className="cart-container">
        <Link
          className="nav-item-link"
          to="/cart">
          <i className="nav-icon bi bi-cart3"></i>
          <span className="cart-button nav-icon-title">GIỎ HÀNG</span>
        </Link>
      </li>
    </ul>
  );
};

const SideMenu = (props) => {
  const sideMenuContent = {
    category: [
      {
        icon: 'side-menu-icon bi bi-cpu',
        title: 'CPU - Bộ Vi Xử Lý',
        link: '/product/cpu',
      },
      {
        icon: 'side-menu-icon bi bi-motherboard',
        title: 'Bo Mạch Chủ',
        link: '/product/main-board',
      },
      {
        icon: 'side-menu-icon bi bi-memory',
        title: 'Ram',
        link: '/product/ram',
      },
      {
        icon: 'side-menu-icon bi bi-gpu-card',
        title: 'VGA - Card Đồ Họa',
        link: '/product/vga',
      },
      {
        icon: 'side-menu-icon bi bi-hdd',
        title: 'Ổ SSD-HDD',
        link: '/product/hard-drive',
      },
      {
        icon: 'side-menu-icon bi bi-power',
        title: 'PSU - Nguồn',
        link: '/product/psu',
      },
      {
        icon: 'side-menu-icon bi bi-pc',
        title: 'Case - Vỏ Máy',
        link: '/product/case',
      },
      {
        icon: 'side-menu-icon bi bi-mouse2',
        title: 'Bàn Phím - Chuột',
        link: '/product/keyboard-mouse',
      },
      {
        icon: 'side-menu-icon bi bi-display',
        title: 'Màn Hình',
        link: '/product/display',
      },
    ],
  };
  const hiddenToggle = useContext(GlobalContext);
  return (
    props.isHidden || (
      <div
        className={props.outerMostClass}
        onClick={props.handler ? hiddenToggle.isHiddenHandler : () => {}}>
        <div className="custom-container">
          <div className="side-menu-container">
            <ul className="side-menu-list">
              {sideMenuContent.category.map((item, index) => {
                return (
                  <li
                    key={index}
                    className="side-menu-item">
                    <Link
                      to={item.link}
                      className="side-menu-link">
                      <i className={item.icon}></i>
                      <div className="side-menu-category">{item.title}</div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    )
  );
};

const ToggleContext = createContext();
const ToggleProvider = ({ children }) => {
  const [hiddenHamburgerMenu, setHiddenHamburgerMenu] = useState(true);
  return (
    <ToggleContext.Provider
      value={{ hiddenHamburgerMenu, setHiddenHamburgerMenu }}>
      {children}
    </ToggleContext.Provider>
  );
};
const NavBarDesktop = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (_, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };
  return (
    <header className="main-nav-section">
      <nav className="custom-container">
        <div className="main-nav-wrapper">
          <div className="logo-and-hambergur-menu-section">
            <ToggleProvider>
              <Link
                to="/"
                onClick={() =>
                  window.scroll({
                    top: 0,
                    left: 0,
                    behavior: 'smooth',
                  })
                }>
                <Logo />
              </Link>
              <HambergurMenu />
            </ToggleProvider>
          </div>
          <div className="main-nav-icon-container">
            <MainNavIcon handleClickOpen={handleClickOpen} />
          </div>
        </div>
      </nav>
      <div className="added-to-cart-panel custom-box-shadow">
        <i className="added-to-cart-icon bi bi-check-circle-fill"></i>
        <span className="added-to-cart-txt">Đã thêm sản phẩm vào giỏ hàng</span>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        disableEscapeKeyDown={true}>
        <DialogContent>
          <RegisterForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </header>
  );
};

export { NavBarDesktop, SideMenu };
