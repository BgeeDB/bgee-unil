import React, { useContext } from 'react';

export const ModalContext = React.createContext({
  onClose: () => {},
});

const useBulmaModalContext = () => useContext(ModalContext);

export default useBulmaModalContext;
