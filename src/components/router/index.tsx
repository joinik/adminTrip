import { createBrowserRouter } from 'react-router-dom';
import { IframeLayout } from '@/components/layout';
import { RequireAuth } from '@/components/auth';
import { LoginElement, NotFoundElement, routeChildren } from './withItems';
import { ErrorElement } from './errorElement';

const appRouter = createBrowserRouter([
  // 框架路由
  {
    path: '/',
    element: (
      <RequireAuth>
        <IframeLayout />
      </RequireAuth>
    ),
    children: routeChildren,
    errorElement: <ErrorElement />,
  },
  // 登录路由
  {
    path: '/login',
    element: LoginElement,
    errorElement: <ErrorElement />,
    // children: routeChildren,
  },
  //404路由
  {
    path: ':miss',
    element: NotFoundElement,
    errorElement: <ErrorElement />,
  },
]);

export default appRouter;
