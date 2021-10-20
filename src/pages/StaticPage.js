import React from 'react';
import staticBuilder from '../helpers/staticBuilder';
import ROUTES from '../routes/routes';

const StaticPage = ({ location: { pathname } }) => (
  <>{staticBuilder(ROUTES[pathname].source)}</>
);

export default StaticPage;
