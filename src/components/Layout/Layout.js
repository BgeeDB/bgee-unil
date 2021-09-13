import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import styles from './layout.module.scss';
import Alert from '../Alert';
import i18n from '../../i18n';
/*
<button class="delete"></button>
 */
const Layout = ({ children }) => {
  const loc = useLocation();
  const [betaNotif, setBetaNotif] = React.useState(true);
  console.log(loc);

  return (
    <div className={styles.layout}>
      <Helmet>
        <title>{i18n.t('')}</title>
      </Helmet>
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
      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
