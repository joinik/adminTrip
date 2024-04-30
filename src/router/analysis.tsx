/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';
import { AreaChartOutlined } from '@ant-design/icons';

const Analysis = lazy(() => import('@/pages/analysisChart'));
export const AnalysisRouter: RouteItem = {
  label: '大数据分析',
  icon: <AreaChartOutlined />,
  path: '/analysis',
  element: <Analysis />,
  meta: {
    title: '大数据分析',
    paths: [{ title: '大数据分析', path: './' }],
  },
};
