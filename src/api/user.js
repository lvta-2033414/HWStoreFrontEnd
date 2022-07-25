import axiosClient from './axiosClient';

export function register(data) {
  const url = `/user/register`;
  return axiosClient.post(url, data);
}
