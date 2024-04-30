import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import 'antd/dist/reset.css';
import Loading from './components/loading';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Loading>
      <App />
    </Loading>
  </React.StrictMode>,
);
