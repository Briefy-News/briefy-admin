import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { extractCookieValue, getCookie, removeBrowserToken, removeCookie, setCookie } from 'src/utils/cookie';

export const instance = axios.create({
  timeout: 5000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    const access = getCookie('access');
    if (access) {
      config.headers.authorization = access;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

const tokenAndRequsetUpdate = async (config: AxiosRequestConfig) => {
  await instance.get('/auth/token');
  const newAccessToken = extractCookieValue('access_token');
  if (!newAccessToken) return;

  const decodeNewAccess = decodeURIComponent(newAccessToken);
  instance.defaults.headers.common.authorization = decodeNewAccess;
  setCookie('access', decodeNewAccess, { path: '/', secure: true, sameSite: 'strict' });
  removeBrowserToken('access_token');

  return instance(config);
};

instance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const { config, response: { status, data } } = error;

    if (status === 401 && !config._retry && data?.message === '토큰이 만료됐거나 잘못된 토큰입니다.') {
      config._retry = true;
      return tokenAndRequsetUpdate(config);
    } if (error.response?.status === 401 && config._retry && data?.message === '리프레시 토큰이 만료되었습니다.') {
      removeCookie('access');
      removeBrowserToken('access_token');
      removeBrowserToken('refresh_token');
      alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
      window.location.href = '/';
      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
);
