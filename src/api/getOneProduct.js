import axiosClient from './axiosClient';

function getProduct(category, id) {
  const url = `/product/${category}/${id}`;
  return axiosClient.get(url);
}

export default getProduct;
