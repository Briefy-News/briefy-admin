import { instance } from './axiosInstance';

export const getOne = async () => {
  const res = await instance.get('/api/user/profile');
  return res;
};
