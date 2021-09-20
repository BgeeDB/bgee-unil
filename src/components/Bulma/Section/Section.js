import React from 'react';
import Element from '../Element/Element';
import classnames from '../../../helpers/classnames';

const Section = ({ children, className, size, ...props }) => (
  <Element
    {...props}
    className={classnames('section', className, {
      [`is-${size}`]: size,
    })}
  >
    {children}
  </Element>
);

// Section.propTypes = {
//   size: PropTypes.oneOfType([
//     PropTypes.oneOf(['small', 'medium', 'large']),
//     PropTypes.string,
//   ]),
//   renderAs: PropTypes.oneOfType([
//     PropTypes.func,
//     PropTypes.string,
//     PropTypes.object,
//   ]),
// };

Section.defaultProps = {
  renderAs: 'section',
};

export default Section;
