import { Roles } from 'src/types/user';
import { instance } from './axiosInstance';

export interface GetAll {
  page: number;
  take?: number;
}

export const getAll = async ({ page, take = 20 } : GetAll) => {
  const query = new URLSearchParams();
  if (page) query.append('page', page.toString());
  if (take) query.append('take', take.toString());

  const res = await instance.get(`/api/user?${query}`);
  return res.data;
};

export const getOne = async () => {
  const res = await instance.get('/api/user/profile');
  return res.data;
};

export interface ChangeRole {
  id: number;
  role: Roles;
}

export const changeRole = async ({ id, role }: ChangeRole) => {
  const query = new URLSearchParams({ role });
  const res = await instance.post(`/api/${id}/change-role?${query}`);
  return res.data;
};
