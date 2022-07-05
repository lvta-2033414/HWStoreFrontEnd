import { useContext, useEffect, useState, createContext, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GlobalContext } from '../store/GlobalState';

import '../cssfile/navibar.css';

const Logo = (props) => {
  const Context = useContext(ToggleContext);
  const firstRender = useRef(false);
  const location = useLocation();
  // console.log(location);
  const trackScroll = useRef(function () {
    if (window.innerWidth > 992) {
      if (window.scrollY > 10) {
        // if (Context.hiddenHamburgerMenu) {
        //   Context.setHiddenHamburgerMenu(false);
        // }
        Context.setHiddenHamburgerMenu(false);
      } else {
        // if (!Context.hiddenHamburgerMenu) {
        //   Context.setHiddenHamburgerMenu(true);
        // }
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
      console.log('add event listeners');
      Context.setHiddenHamburgerMenu(true);
      document.addEventListener('scroll', trackScroll.current);
    }
  }, [location]);

  useEffect(() => {
    if (firstRender.current && window.location.pathname !== '/') {
      console.log('remove event listeners');
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

const MainNavIcon = () => {
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
        <a
          className="nav-item-link"
          href="/">
          <i className="nav-icon bi bi-person-circle"></i>
          <span
            className="sign-in-button nav-icon-title"
            href="#">
            ĐĂNG NHẬP
          </span>
        </a>
      </li>
      <li className="cart-container">
        <a
          className="nav-item-link"
          href="/">
          <i className="nav-icon bi bi-cart3"></i>
          <span
            className="cart-button nav-icon-title"
            href="#">
            GIỎ HÀNG
          </span>
        </a>
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
    // props.isHidden
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
  return (
    <header className="main-nav-section">
      <nav className="custom-container">
        <div className="main-nav-wrapper">
          <div className="logo-and-hambergur-menu-section">
            <ToggleProvider>
              <Link to="/">
                <Logo />
              </Link>
              <HambergurMenu />
            </ToggleProvider>
          </div>
          <div className="main-nav-icon-container">
            <MainNavIcon />
          </div>
        </div>
      </nav>
    </header>
  );
};

export { NavBarDesktop, SideMenu };
