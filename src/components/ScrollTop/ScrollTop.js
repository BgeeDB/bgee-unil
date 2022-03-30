import React from 'react';
import { useLocation } from 'react-router-dom';

const ScrollTop = ({ children }) => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    console.debug(pathname);
    window.scrollTo(0, 0);
  }, [pathname]);

  return <>{children}</>;
};

export default ScrollTop;
