import { useEffect, useState, useRef, memo } from 'react';

import productsOnHome from '../api/productsOnHome';
import {
  Carousel,
  SideMenu,
  ProductListPanel,
  ProductListLoading,
} from '../components/';

const HomePage = () => {
  console.log('HomePage');
  const [productlist, setProductList] = useState({});
  // const [isLoading, setIsLoading] = useState(true);
  let isLoading = useRef(true);
  useEffect(() => {
    const fetchProductsOnHome = async () => {
      const result = await productsOnHome.getAll();
      setProductList(result);
      // setIsLoading(false);
      isLoading.current = false;
    };
    fetchProductsOnHome();
  }, []);
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // });

  return (
    <>
      <Carousel />
      <SideMenu
        outerMostClass="side-menu-section permanents"
        isHidden={false}
        handler={false}
      />

      {/* || !Array.isArray(productlist.discountProductList) */}
      {isLoading.current ? (
        <ProductListLoading sectionTitle={'Sản Phẩm Khuyến Mãi'} />
      ) : (
        <ProductListPanel
          productList={productlist.discountProductList}
          sectionClassName="discount-product-section"
          sectionTitle="Sản Phẩm Khuyến Mãi"
        />
      )}
      {isLoading.current || !Array.isArray(productlist.bestSellProductList) ? (
        <ProductListLoading sectionTitle={'Sản Phẩm Bán Chạy'} />
      ) : (
        <ProductListPanel
          productList={productlist.bestSellProductList}
          sectionClassName="bestsell-product-section"
          sectionTitle="Sản Phẩm Bán Chạy"
        />
      )}
      {isLoading.current || !Array.isArray(productlist.newProductList) ? (
        <ProductListLoading sectionTitle={'Sản Phẩm Bán Chạy'} />
      ) : (
        <ProductListPanel
          productList={productlist.newProductList}
          sectionClassName="new-product-section"
          sectionTitle="Sản Phẩm Mới"
        />
      )}
    </>
  );
};

export default memo(HomePage);
