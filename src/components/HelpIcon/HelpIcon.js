import React from 'react';
import Tooltip from '../Tooltip';

const HelpIcon = ({ title, content, style, className }) => (
  <Tooltip title={title} content={content} style={style} className={className}>
    <span className="icon is-clickable">
      <ion-icon name="help-circle" size="large" />
    </span>
  </Tooltip>
);

export default HelpIcon;
