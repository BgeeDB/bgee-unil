import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Alert from '../Alert';
import Bulma from '../Bulma';

const Layout = ({ children }) => {
  const [betaNotif, setBetaNotif] = React.useState(true);

  return (
    <div className="layout">
      <Header />
      {betaNotif && (
        <Alert type="warning" light>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            className="delete"
            type="button"
            onClick={() => setBetaNotif(false)}
          />
          <div>
            <p className="is-size-7">
              This release is a <b>beta</b> version. Please be aware that the
              data will not be archived and should not yet be referenced in
              publications, expecting long-term retrieval. The SPARQL endpoint
              was not updated.
            </p>
          </div>
        </Alert>
      )}
      <Bulma.Section>
        <Bulma.Container>{children}</Bulma.Container>
      </Bulma.Section>
      <Footer />
    </div>
  );
};

export default Layout;
