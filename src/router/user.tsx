import { lazy } from 'react';
import { TeamOutlined } from '@ant-design/icons';

const User = lazy(() => import('@/pages/user'));

export const OtherRouter: RouteItem = {
  label: '用户页面',
  icon: <TeamOutlined />,
  path: '/users',
  element: <User />,
  meta: {
    title: '用户页面',
    paths: [{ title: '用户页面', path: '/users' }],
  },
};
