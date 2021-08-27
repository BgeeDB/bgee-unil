import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import styles from './layout.module.scss';

const Layout = ({ children }) => (
  <div className={styles.layout}>
    <Header />
    <div className={styles.container}>{children}</div>
    <Footer />
  </div>
);

export default Layout;
