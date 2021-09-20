import React from 'react';
import classnames from '../../helpers/classnames';

const LinkExternal = ({ id, to, text, className }) => (
  <a
    href={to}
    target="_blank"
    rel="noopener noreferrer"
    id={id}
    className={classnames('external-link', className)}
  >
    {text}
  </a>
);
export default LinkExternal;
