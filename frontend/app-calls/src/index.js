import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const bodyEl = ReactDOM.createRoot(document.querySelector('body'));
bodyEl.render(
  <BrowserRouter>
      <App />
  </BrowserRouter>
);