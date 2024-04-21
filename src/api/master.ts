import { request } from '@/utils/axios';
import {User} from '@/model/User'

/**
 * 登录返回sign
 * @param data 请求数据
 * @returns sign 用户签名
 */
export const loginGet = (data: { user: string; pwd: string }) => {
  const url = `/admin/login/${data.user}/${data.pwd}`;
  return request<{ sign: string }>({ url });
};

export const userDateGet = (data: {name?: string; password?: string} ={}) => {
  const url = '/admin/user';
  if (data) return request<{info: string}>({url, method: 'POST', data})
  return request<{info: User[]}>({url})
};
