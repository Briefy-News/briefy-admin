import { Cookies } from 'react-cookie';
import JsCookies from 'js-cookie';

type CookieSetOptions = {
  path?: string;
  expires?: Date;
  maxAge?: number;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
};

// react-cookie
const cookies = new Cookies();

export const setCookie = (name: string, value: string, options: CookieSetOptions) => cookies.set(name, value, { ...options });

export const getCookie = (name: string) => cookies.get(name);

export const removeCookie = (name: string) => cookies.remove(name);

// extract cookie
export const extractCookieValue = (name: string) => {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

// js-cookie
export const removeBrowserToken = (name: string) => {
  JsCookies.remove(name);
};
