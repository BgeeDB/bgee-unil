import React from 'react';
import { Helmet } from 'react-helmet';
import staticBuilder from '../helpers/staticBuilder';
import ROUTES from '../routes/routes';

const StaticPage = ({ location: { pathname } }) => (
  <>
    {ROUTES[pathname].meta && (
      <Helmet>
        <title>{ROUTES[pathname].meta.title}</title>
        <meta name="decription" content={ROUTES[pathname].meta.description} />
        <meta name="keywords" content={ROUTES[pathname].meta.keywords} />
      </Helmet>
    )}
    {staticBuilder(ROUTES[pathname].source)}
  </>
);

export default StaticPage;
