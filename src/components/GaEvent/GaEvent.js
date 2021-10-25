import React from 'react';
import ReactGA from 'react-ga';
import config from '../../config.json';

const GaEvent = ({ category, action, label, value, children }) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
  <span
    onClick={() => {
      if (category && action)
        ReactGA.event({
          category: `${category}_${config.version}`,
          action,
          label,
          value,
        });
    }}
  >
    {children}
  </span>
);

export default GaEvent;
