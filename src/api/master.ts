import { request } from '@/utils/axios';

/**
 * 登录返回sign
 * @param data 请求数据
 * @returns sign 用户签名
 */
export const loginGet = (data: { user: string; pwd: string }) => {
  const url = `/admin/login/${data.user}/${data.pwd}`;
  return request<{ sign: string }>({ url });
};

const userDateGet = () => {
  const url = '/admin/user';
};
