import { useEffect, useState, memo } from 'react';
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
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchProductsOnHome = async () => {
      const productlist = await productsOnHome.getAll();
      setProductList(productlist);
      setIsLoading(false);
      console.log(isLoading);
    };
    fetchProductsOnHome();
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <>
      <Carousel />
      <SideMenu
        outerMostClass="side-menu-section permanents"
        isHidden={false}
        handler={false}
      />
      {/* || !Array.isArray(productlist.discountProductList) */}
      {isLoading || !Array.isArray(productlist.discountProductList) ? (
        <ProductListLoading sectionTitle={'Sản Phẩm Khuyến Mãi'} />
      ) : (
        <ProductListPanel
          productList={productlist.discountProductList}
          sectionClassName="discount-product-section"
          sectionTitle="Sản Phẩm Khuyến Mãi"
        />
      )}
      {/* {isLoading || !Array.isArray(productlist.bestSellProductList) ? (
        <ProductListLoading sectionTitle={'Sản Phẩm Bán Chạy'} />
      ) : (
        <ProductListPanel
          productList={productlist.bestSellProductList}
          sectionClassName="bestsell-product-section"
          sectionTitle="Sản Phẩm Bán Chạy"
        />
      )}
      {isLoading || !Array.isArray(productlist.newProductList) ? (
        <ProductListLoading sectionTitle={'Sản Phẩm Bán Chạy'} />
      ) : (
        <ProductListPanel
          productList={productlist.newProductList}
          sectionClassName="new-product-section"
          sectionTitle="Sản Phẩm Mới"
        />
      )} */}
    </>
  );
};

export default memo(HomePage);
