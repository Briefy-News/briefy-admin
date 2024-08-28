import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { getCookie, removeCookie, setCookie } from 'src/utils/cookie';

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

const tokenAndRequestUpdate = async (config: AxiosRequestConfig) => {
  const res = await instance.get('/auth/token');
  const newAccessToken = res.headers.authorization;
  if (!newAccessToken) return;

  const decodeNewAccess = decodeURIComponent(newAccessToken);
  instance.defaults.headers.common.authorization = decodeNewAccess;
  setCookie('access', decodeNewAccess, { path: '/', secure: true, sameSite: 'strict' });

  return instance(config);
};

instance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const { config, response: { status, data } } = error;

    if (status === 401 && !config._retry && data?.message === '토큰이 만료됐거나 잘못된 토큰입니다.') {
      config._retry = true;
      return tokenAndRequestUpdate(config);
    }

    if (status === 401 && config._retry && data?.message === '리프레시 토큰이 만료되었습니다.') {
      removeCookie('access');
      alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
      window.location.href = '/signin';
      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
);
