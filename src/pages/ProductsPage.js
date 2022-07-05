import { useEffect, useState, useRef, memo } from 'react';
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
import '../cssfile/ProductsPage.css';

export const ProductsPage = memo(() => {
  const params = useParams();
  // console.log(params);
  // const [productlist, setProductList] = useState([]);
  const isLoading = useRef(true);
  // useEffect(() => {
  //   const fetchProductList = async () => {
  //     const productlist = await productList.getAll(params.category);
  //     setProductList(productlist);
  //     isLoading.current = false;
  //   };
  //   fetchProductList();
  // }, [params.category]);
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // });

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
      {/* <div style={{ height: '900px' }}></div> */}
      <Filter filter={filter} />
      {isLoading.current ? (
        <>
          <ProductListLoading sectionTitle={title} />
        </>
      ) : (
        <>
          <ProductListPanel
            // productList={productlist}
            sectionTitle={title}
          />
        </>
      )}
    </>
  );
});

//  default memo(ProductsPage);
