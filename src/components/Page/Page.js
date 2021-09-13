import React from 'react';
import { Helmet } from 'react-helmet';

const Page = ({ Component, title }) => (
  <>
    {title && (
      <Helmet>
        <title>{title}</title>
      </Helmet>
    )}
    <Component />
  </>
);

export default Page;
