import React from 'react';
import Tooltip from '../Tooltip';

const HelpIcon = ({ title, content, style }) => (
  <Tooltip title={title} content={content} style={style}>
    <span className="icon is-clickable">
      <ion-icon name="help-circle" size="large" />
    </span>
  </Tooltip>
);

export default HelpIcon;
