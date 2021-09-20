import React from 'react';
import Element from '../Element/Element';
import classnames from '../../../helpers/classnames';
import TagGroup from './TagGroup';

const Tag = ({
  children,
  className,
  color,
  size,
  rounded,
  remove,
  ...props
}) => (
  <Element
    {...props}
    className={classnames('tag', className, {
      [`is-${size}`]: size,
      [`is-${color}`]: color,
      'is-rounded': rounded,
      'is-delete': remove,
    })}
  >
    {!remove && children}
  </Element>
);

Tag.Group = TagGroup;

// Tag.propTypes = {
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
//   size: PropTypes.oneOfType([
//     PropTypes.oneOf(['medium', 'large']),
//     PropTypes.string,
//   ]),
//   rounded: PropTypes.bool,
//   remove: PropTypes.bool,
//   renderAs: PropTypes.oneOfType([
//     PropTypes.func,
//     PropTypes.string,
//     PropTypes.object,
//   ]),
// };

Tag.defaultProps = {
  renderAs: 'span',
};

export default Tag;
