import React from 'react';
import ReactDOM from 'react-dom';
import './styles/global.scss';
import ReactGA from 'react-ga';
import { Helmet } from 'react-helmet';
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
    <Helmet>
      <title>Welcome to Bgee: a dataBase for Gene Expression Evolution</title>
      <meta
        name="description"
        content="Bgee is a database for retrieval and comparison of gene expression patterns across multiple animal species. It provides an intuitive answer to the question -where is a gene expressed?- and supports research in cancer and agriculture as well as evolutionary biology."
      />
      <meta
        name="keywords"
        content="bgee, gene expression, evolution, ontology, anatomy, development, evo-devo database, anatomical ontology, developmental ontology, gene expression evolution"
      />
    </Helmet>
    <Router />
  </React.StrictMode>,
  document.getElementById('root')
);
