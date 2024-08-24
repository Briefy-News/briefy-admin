import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import RQProvider from 'src/components/provider/RQProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <RQProvider>
        <App />
      </RQProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
