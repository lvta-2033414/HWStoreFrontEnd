import axiosClient from './axiosClient';

const productsOnHome = {
  getAll() {
    const url = '/product/onhome';
    return axiosClient.get(url);
  },
};

export default productsOnHome;
