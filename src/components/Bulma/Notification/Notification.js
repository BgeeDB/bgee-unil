import React from 'react';
import Element from '../Element/Element';
import classnames from '../../../helpers/classnames';

const Notification = ({ className, color, light, ...props }) => (
  <Element
    {...props}
    className={classnames(
      'notification',
      {
        [`is-${color}`]: color,
        'is-light': light,
      },
      className
    )}
  />
);

// Notification.propTypes = {
//   color: PropTypes.oneOfType([
//     PropTypes.oneOf([
//       'primary',
//       'link',
//       'info',
//       'success',
//       'warning',
//       'danger',
//       'dark',
//       'text',
//     ]),
//     PropTypes.string,
//   ]),
//   light: PropTypes.bool,
// };

export default Notification;
