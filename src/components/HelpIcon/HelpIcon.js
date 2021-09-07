import React from 'react';
import Tooltip from '../Tooltip';

const HelpIcon = ({ title, content }) => (
  <Tooltip title={title} content={content}>
    <span className="icon is-clickable">
      <ion-icon name="help-circle" size="large" />
    </span>
  </Tooltip>
);

export default HelpIcon;
