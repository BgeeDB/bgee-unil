import React from 'react';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';
import ROUTES from '../../routes/routes';
import i18n from '../../i18n';

class Page extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: { name: error.name, message: error.message } };
  }

  componentDidCatch(error) {
    // You can also log the error to an error reporting service
    // trigger ga error
    console.debug(error);
  }

  render() {
    const { hasError } = this.state;
    if (hasError)
      return (
        <Redirect
          to={{
            pathname: '/error',
            state: { error: hasError },
          }}
        />
      );

    const { Component, title, ...props } = this.props;
    return (
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
  }
}
export default Page;
