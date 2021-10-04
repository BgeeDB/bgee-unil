import React from 'react';
import ReactDOM from 'react-dom';
import classnames from '../../helpers/classnames';

const Notifications = ({ content, closeElement }) => {
  const [portalContainer, setPortalContainer] = React.useState();

  React.useEffect(() => {
    const doc = document;
    const container = doc.createElement('div');
    container.setAttribute('class', 'notifications');
    doc.body.appendChild(container);
    setPortalContainer(container);

    return () => {
      container.parentNode.removeChild(container);
    };
  }, []);

  if (!portalContainer) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      {content.map((c) => (
        <div key={c.id} className={classnames('notification', c.className)}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            className="delete"
            type="button"
            onClick={closeElement(c.id)}
          />
          {c.children}
        </div>
      ))}
    </>,
    portalContainer
  );
};

export default Notifications;
