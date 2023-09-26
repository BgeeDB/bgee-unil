import React from 'react';
import ReactDOM from 'react-dom';
import './styles/global.scss';
import { Helmet } from 'react-helmet';
import Router from './routes';

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
      <script>
      {`
        var _paq = window._paq = window._paq || [];
        /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
        _paq.push(["setCookieDomain", "*.bgee.org"]);
        _paq.push(["setDomains", ["*.bgee.org"]]);
        _paq.push(['trackPageView']);
        _paq.push(['enableLinkTracking']);
        (function() {
          var u="https://matomo.sib.swiss/";
          _paq.push(['setTrackerUrl', u+'matomo.php']);
          _paq.push(['setSiteId', '14']);
          var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
          g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
        })();

       // ONLY for the SPA because the page doesn't reload on navigation to other pages
       document.body.addEventListener('click', (event) => {
         const clickedUrl = event.originalTarget.href;
         // if a NAVIGATION link (menu item in the SPA) was clicked
         if(clickedUrl) {
           _paq.push(['setCustomUrl', clickedUrl]);
           _paq.push(['trackPageView']);
           _paq.push(['enableLinkTracking']);
         }
       });
      `}
      </script>
    </Helmet>
    <Router />
  </React.StrictMode>,
  document.getElementById('root')
);
