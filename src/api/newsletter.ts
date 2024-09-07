import { Newsletter } from 'src/types/newsletter';
import { instance } from './axiosInstance';

export const insertOne = async (body: Newsletter) => {
  const res = await instance.post('/api/newsletter', body);
  return res.data;
};
