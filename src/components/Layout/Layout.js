import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import styles from './layout.module.scss';
import Alert from '../Alert';

const Layout = ({ children }) => (
  <div className={styles.layout}>
    <Header />
    <Alert type="warning" light closable>
      <>
        We are happy to announce that we have released the new Bgee 15 version
        as a beta test. Please check it out at{' '}
        <a href="https://bgee.org/bgee15_0">https://bgee.org/bgee15_0</a>.
      </>
    </Alert>
    <div className={styles.container}>{children}</div>
    <Footer />
  </div>
);

export default Layout;
