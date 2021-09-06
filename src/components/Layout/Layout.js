import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import styles from './layout.module.scss';
import Alert from '../Alert';
/*
<button class="delete"></button>
 */
const Layout = ({ children }) => {
  const [betaNotif, setBetaNotif] = React.useState(true);

  return (
    <div className={styles.layout}>
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
            We are happy to announce that we have released the new Bgee 15
            version as a beta test. Please check it out at{' '}
            <a href="https://bgee.org/bgee15_0">https://bgee.org/bgee15_0</a>.
          </div>
        </Alert>
      )}
      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
