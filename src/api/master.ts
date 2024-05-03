import { request } from '@/utils/axios';

/**
 * 登录返回sign
 * @param data 请求数据
 * @returns sign 用户签名
 */
export const loginGet = (data: { user: string; pwd: string }) => {
  const url = `/admin/login/${data.user}/${data.pwd}`;
  return request<{ info: string }>({ url });
};

/**
 * 获取用户数据
 * @param start 页码
 * @param data 用户数据
 * @returns User[], info
 */
export const userDateGet = (
  start: number = 1,
  data: { name?: string; password?: string } = {},
) => {
  const url = start ? `/admin/user?start=${start}` : '/admin/user';
  if (data === null)
    return request<{ info: string }>({ url, method: 'POST', data });
  return request<{ info: User[]; total: number }>({ url });
};

/**
 * 修改用户数据
 * @param data 用户数据
 * @returns 
 */
export const userEdit = (data: Partial<User>) => {
  const url = '/admin/user';
  const method = 'PATCH';
  return request<unknown>({ url, method, data: { ...data } });
};
