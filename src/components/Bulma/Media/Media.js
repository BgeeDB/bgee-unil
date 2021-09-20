import React from 'react';
import Element from '../Element/Element';
import classnames from '../../../helpers/classnames';
import MediaItem from './MediaItem';

const Media = ({ children, className, ...props }) => (
  <Element {...props} className={classnames('media', className, {})}>
    {children}
  </Element>
);

Media.Item = MediaItem;

// Media.propTypes = {
//   renderAs: PropTypes.oneOfType([
//     PropTypes.func,
//     PropTypes.string,
//     PropTypes.object,
//   ]),
// };

Media.defaultProps = {
  renderAs: 'article',
};

export default Media;
