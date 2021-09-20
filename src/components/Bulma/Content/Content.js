import React from 'react';
import classnames from '../../../helpers/classnames';
import Element from '../Element/Element';

const Content = ({ children, className, size, ...props }) => (
  <Element
    {...props}
    className={classnames('content', className, {
      [`is-${size}`]: size,
    })}
  >
    {children}
  </Element>
);

// Content.propTypes = {
//   size: PropTypes.oneOfType([
//     PropTypes.oneOf(['small', 'medium', 'large']),
//     PropTypes.string,
//   ]),
// };

Content.defaultProps = {};

export default Content;
