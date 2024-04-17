import { siteConfig } from '@/config';
import axios, { AxiosRequestConfig } from 'axios';

/**axios实例 */
export const baseURL = siteConfig.domain;
export const axiosInstance = axios.create({
  baseURL: siteConfig.domain,
  headers: {},
});

// let token: string | null = window.localStorage.getItem('token');
// let sign: string | null = window.localStorage.getItem('sign');

/**获取token */
// export const getToken = async () => {
//   // if (token !== null) return token;
//   if (sign !== null) return sign;
//   return getTokenByPerg();
// };

const getSign = async () => {
  const rest = await request<{ sign: string }>({
    url: '/admin/login',
  });
  window.localStorage.setItem('sign', rest.sign);
  return rest.sign;
};

/**从后端获取token */
// const getTokenByPerg = async () => {
//   const sign = window.localStorage.getItem('sign');
//   const result = await request<{ token: string }>({
//     url: '/master/v1/token',
//     headers: { sign },
//   });
//   window.localStorage.setItem('token', result.token);
//   token = result.token;
//   return token;
// };

/**发送请求前 */
axiosInstance.interceptors.request.use(async config => {
  const { url } = config;
  if (url === '/master/v1/token' || url === '/admin/login') return config;
  const sign = await getSign();
  const { headers } = config;
  headers.sign = sign;
  return config;
});

/**返回响应之前 */
axiosInstance.interceptors.response.use(
  res => res.data,
  // 错误响应处理
  async err => {
    if (!err.response) return Promise.reject(err);

    const { response, code } = err;
    const { url, method } = err.config;
    const { status } = response;
    if (response?.data) {
      console.log(response.data, url, method, status, code);

      /** 
      const data: { errorCode: number } = response.data;

      //sign失败 ，重登
      if (data.errorCode === 3000 || data.errorCode === 3001) {
        const { location } = window;
        window.localStorage.removeItem('sign');
        window.localStorage.removeItem('token');
        if (location.pathname !== '/login') {
          location.reload();
        }
      }

      //token失败，刷新token并重登
      if (data.errorCode === 4000) {
        await getTokenByPerg();
        return axiosInstance(response.config);
      }

      return Promise.reject(...data, method, status, code, url);
      */
    }
    return Promise.reject(err);
  },
);

/**发起请求 */
export const request = <R>(op: AxiosRequestConfig) => {
  return <Promise<R>>axiosInstance(op);
};
