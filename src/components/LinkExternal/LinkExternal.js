import React from 'react';

const LinkExternal = ({ to, text, className }) => (
  <a
    href={to}
    target="_blank"
    rel="noopener noreferrer"
    className={`external-link ${className || ''}`}
  >
    {text}
  </a>
);
export default LinkExternal;
