import React from 'react';

const Alert = ({
  type = 'warning',
  light = false,
  children,
  closable = false,
}) => {
  const [isClosed, setIsClosed] = React.useState(false);

  if (isClosed) return null;
  return (
    <div className={`notification is-${type} ${light ? 'is-light' : ''}`}>
      {closable && (
        // eslint-disable-next-line jsx-a11y/control-has-associated-label,react/button-has-type
        <button className="delete" onClick={() => setIsClosed(true)} />
      )}
      {children}
    </div>
  );
};

export default Alert;
