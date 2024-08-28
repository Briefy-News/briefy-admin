import { Cookies } from 'react-cookie';

type CookieSetOptions = {
  path?: string;
  expires?: Date;
  maxAge?: number;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
};

const cookies = new Cookies();

export const setCookie = (name: string, value: string, options: CookieSetOptions) => cookies.set(name, value, { ...options });

export const getCookie = (name: string) => cookies.get(name);

export const removeCookie = (name: string) => cookies.remove(name);
