import 'antd/dist/reset.css';
import { useEffect, useState } from 'react';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Loading } from './components/loading';
function App() {
  const [router, setRouter] = useState(
    null as unknown as ReturnType<typeof createBrowserRouter>,
  );
  useEffect(() => {
    import('@/components/router').then(res => {
      setRouter(res.default);
    });
  }, [setRouter]);


  return (
    router? <RouterProvider router={router}/>: <Loading />
  );
}

export default App;
