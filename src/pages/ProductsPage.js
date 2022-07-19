import { memo, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import productList from '../api/productList';
import {
  EmptyProductList,
  Filter,
  ProductListLoading,
  ProductListPanel,
} from '../components';
import {
  caseOptions,
  cpuOptions,
  displayOptions,
  hddOptions,
  keyboardOptions,
  mainOptions,
  psuOptions,
  ramOptions,
  vgaOptions,
} from '../components/FilterOptions';
import '../cssfile/ProductsPage.css';

export const ProductsPage = memo(() => {
  const params = useParams();
  const [productlist, setProductList] = useState([]);
  const isLoading = useRef(true);
  const [rerender, setRerender] = useState(false);
  let filteredProduct = useRef([]);
  useEffect(() => {
    const fetchProductList = async () => {
      const productlist = await productList.getAll(params.category);
      setProductList(productlist);
      isLoading.current = false;
    };
    fetchProductList();
    filteredProduct.current = [];
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
  return (
    <>
      <Filter
        filter={filter}
        productList={productlist}
        setFilteredProduct={(filteredArray) => {
          filteredProduct.current = [...filteredArray];
          console.log(filteredProduct.current);
        }}
        setRerender={setRerender}
      />
      {isLoading.current ? (
        <ProductListLoading sectionTitle={title} />
      ) : filteredProduct.current.length > 0 ? (
        filteredProduct.current[0] === null ? (
          <EmptyProductList />
        ) : (
          <ProductListPanel
            productList={filteredProduct.current}
            sectionTitle={title}
          />
        )
      ) : (
        <ProductListPanel
          productList={productlist}
          sectionTitle={title}
        />
      )}
    </>
  );
});
