import React from 'react';
import ReactDOM from 'react-dom';
import './styles/global.scss';
import Router from './routes';

ReactDOM.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
  document.getElementById('root')
);
