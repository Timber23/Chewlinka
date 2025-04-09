import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('dev-dist/sw.js').then(registration => {
      console.log('Service worker registered: ', registration);
    }).catch(error => {
      console.log('Service worker registration failed: ', error);
    });
  });
}

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);