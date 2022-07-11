import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { GlobalContext } from './store/GlobalState';

import './index.css';

import { HomePage, ProductsPage, SingleProductPage } from './pages';
import { NavBarDesktop, SideMenu, Footer } from './components';
import { FilterProvider } from './store/FilterState';

function App() {
  const Context = useContext(GlobalContext);
  return (
    <>
      <NavBarDesktop />
      <SideMenu
        outerMostClass="side-menu-section hamburger"
        isHidden={Context.isHidden}
        handler={true}
      />
      <Routes>
        <Route
          exact
          path="/"
          element={<HomePage />}
        />
        <Route
          path="/product/:category"
          element={
            <FilterProvider>
              <ProductsPage />
            </FilterProvider>
          }
        />
        <Route
          path="/product/:category/:id"
          element={<SingleProductPage />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
