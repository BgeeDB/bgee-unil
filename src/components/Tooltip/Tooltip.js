import React from 'react';

const Tooltip = ({ children, title, content }) => (
  <div className="tooltip">
    {children}
    <span className="tooltip-content">
      {title && (
        <div className="tooltip-header">
          <p className="has-text-weight-semibold is-size-6 has-text-dark">
            {title}
          </p>
        </div>
      )}
      <div className="tooltip-body">
        <p className="is-size-6 has-text-weight-normal">{content}</p>
      </div>
    </span>
  </div>
);

export default Tooltip;
