import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {HelmetProvider} from 'react-helmet-async'
import {PayPalScriptProvider} from '@paypal/react-paypal-js'
import { StoreProvider } from './store';
import 'react-toastify/dist/ReactToastify.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StoreProvider>
    <HelmetProvider>
      <PayPalScriptProvider deferLoading={true}>
    <App />
      </PayPalScriptProvider>
    </HelmetProvider>
    </StoreProvider>
  </React.StrictMode>
);

reportWebVitals();
