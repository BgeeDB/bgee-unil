import React from 'react';
import ReactDOM from 'react-dom';
import './styles/global.scss';
import ReactGA from 'react-ga';
import config from './config.json';
import Router from './routes';

ReactGA.initialize(
  process.env.NODE_ENV !== 'production'
    ? config.googleAnalyticsIdDev
    : config.googleAnalyticsIdProd,
  {
    // debug: process.env.NODE_ENV !== 'production',
    cookieDomain: 'auto',
    cookieExpires: 7200,
    cookieFlags: 'SameSite=None; Secure',
  }
);
ReactGA.set({ anonymizeIp: true });
ReactGA.pageview(window.location.pathname + window.location.search);

ReactDOM.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
  document.getElementById('root')
);
