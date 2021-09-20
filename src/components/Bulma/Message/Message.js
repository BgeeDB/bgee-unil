import React from 'react';
import Element from '../Element/Element';
import classnames from '../../../helpers/classnames';
import MessageBody from './MessageBody';
import MessageHeader from './MessageHeader';

const Message = ({ children, className, color, size, ...props }) => (
  <Element
    {...props}
    className={classnames('message', className, {
      [`is-${color}`]: color,
      [`is-${size}`]: size,
    })}
  >
    {children}
  </Element>
);

Message.Body = MessageBody;

Message.Header = MessageHeader;

// Message.propTypes = {
//   /**
//    * Adjusts the size of the message block.
//    */
//   size: PropTypes.oneOfType([
//     PropTypes.oneOf(['small', 'medium', 'large']),
//     PropTypes.string,
//   ]),
//   /**
//    * Adjusts the color of the message block. Can be any Bulma color values.
//    */
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
//   renderAs: PropTypes.oneOfType([
//     PropTypes.func,
//     PropTypes.string,
//     PropTypes.object,
//   ]),
// };

Message.defaultProps = {
  renderAs: 'article',
};

export default Message;
