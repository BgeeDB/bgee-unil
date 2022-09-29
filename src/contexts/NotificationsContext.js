import React from 'react';
import ReactDOM from 'react-dom';
import useNotification from '../hooks/useNotifications';
import classnames from '../helpers/classnames';

const NotificationContext = React.createContext();
const { Provider } = NotificationContext;

const Notifications = () => {
  const { notifications, closeNotif } = React.useContext(NotificationContext);

  return ReactDOM.createPortal(
    <>
      {notifications.map((c) => (
        <div key={c.id} className={classnames('notification', c.className)}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            className="delete"
            type="button"
            onClick={() => closeNotif(c.id)}
          />
          {c.children}
        </div>
      ))}
    </>,
    document.querySelector('#notifications')
  );
};
const NotificationProvider = ({ children }) => {
  const {
    notifications,
    addNotification,
    addNotifications,
    cleanNotifications,
    closeNotif,
  } = useNotification();
  return (
    <Provider
      value={{
        notifications,
        addNotification,
        addNotifications,
        cleanNotifications,
        closeNotif,
      }}
    >
      <Notifications />
      {children}
    </Provider>
  );
};

export { NotificationContext, NotificationProvider };
