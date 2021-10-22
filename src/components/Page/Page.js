import React from 'react';
import { Helmet } from 'react-helmet';
import ROUTES from '../../routes/routes';
import i18n from '../../i18n';

const Page = ({ Component, title, ...props }) => (
  <>
    {(title || ROUTES[props.location.pathname]?.i18nKey) && (
      <Helmet>
        <title>
          {title || i18n.t(ROUTES[props.location.pathname].i18nKey)}
        </title>
      </Helmet>
    )}
    <Component {...props} />
  </>
);

export default Page;
