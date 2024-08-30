import { Category } from './category';

export enum Roles {
  ADMIN = 'admin', // 관리자
  USER = 'user', // 사용자
}

type RolesName = '관리자' | '사용자';

export const roleName: Record<Roles, RolesName> = {
  [Roles.ADMIN]: '관리자',
  [Roles.USER]: '사용자',
};

export interface User {
  id: number;
  name: string;
  email: string;
  interest: Category[];
  role: Roles;
  createAt: Date;
  updateAt: Date;
}
