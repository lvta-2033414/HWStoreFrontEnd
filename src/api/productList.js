import axiosClient from './axiosClient';

const productList = {
  getAll(category) {
    const url = `/product/${category}`;
    return axiosClient.get(url);
  },
};

export default productList;
