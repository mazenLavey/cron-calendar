import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import App from './App';
import { CronProvider } from 'context/CronContext';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <CronProvider>
      <App />
    </CronProvider>
  </React.StrictMode>
);
