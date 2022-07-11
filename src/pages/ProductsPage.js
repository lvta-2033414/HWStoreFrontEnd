import { useEffect, useState, useRef, memo, useContext } from 'react';
import { useParams } from 'react-router-dom';

import productList from '../api/productList';
import { ProductListPanel, ProductListLoading, Filter } from '../components';
import {
  cpuOptions,
  mainOptions,
  ramOptions,
  vgaOptions,
  hddOptions,
  psuOptions,
  caseOptions,
  keyboardOptions,
  displayOptions,
} from '../components/FilterOptions';
import { FilterContext } from '../store/FilterState';
import '../cssfile/ProductsPage.css';

export const ProductsPage = memo(() => {
  const params = useParams();
  const [productlist, setProductList] = useState([]);
  // const [filteredProduct, setFilteredProduct] = useState([]);
  const isLoading = useRef(true);
  let filteredProduct = useRef([]);
  useEffect(() => {
    const fetchProductList = async () => {
      const productlist = await productList.getAll(params.category);
      setProductList(productlist);
      isLoading.current = false;
    };
    fetchProductList();
    filteredProduct = [];
  }, [params.category]);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  let title, filter;
  switch (params.category) {
    case 'cpu':
      title = 'CPU - Bộ Vi Xử Lý';
      filter = cpuOptions;
      break;
    case 'main-board':
      title = 'Bo Mạch Chủ';
      filter = mainOptions;
      break;
    case 'ram':
      title = 'Ram';
      filter = ramOptions;
      break;
    case 'vga':
      title = 'VGA - Card Đồ Họa';
      filter = vgaOptions;
      break;
    case 'hard-drive':
      title = 'Ổ SSD-HDD';
      filter = hddOptions;
      break;
    case 'psu':
      title = 'PSU - Nguồn';
      filter = psuOptions;
      break;
    case 'case':
      title = 'Case - Vỏ Máy';
      filter = caseOptions;
      break;
    case 'keyboard-mouse':
      title = 'Bàn Phím - Chuột';
      filter = keyboardOptions;
      break;
    case 'display':
      title = 'Màn Hình';
      filter = displayOptions;
      break;
    default:
      title = 'Sản Phẩm';
  }
  console.log('ProductsPage redeered');
  return (
    <>
      <Filter
        filter={filter}
        productList={productlist}
        setFilteredProduct={(filteredArray) => {
          filteredProduct.current = [...filteredArray];
          console.log(filteredProduct.current);
        }}
      />
      {isLoading.current ? (
        <ProductListLoading sectionTitle={title} />
      ) : (
        <ProductListPanel
          productList={productlist}
          sectionTitle={title}
        />
      )}
    </>
  );
});
