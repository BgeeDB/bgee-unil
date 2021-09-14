import React from 'react';
import Element from '../Element/Element';
import classnames from '../../../helpers/classnames';

const HeroHeader = ({ className, ...props }) => (
  <Element {...props} className={classnames(className, 'hero-head')} />
);

// HeroHeader.propTypes = {
//   renderAs: PropTypes.oneOfType([
//     PropTypes.func,
//     PropTypes.string,
//     PropTypes.object,
//   ]),
// };

HeroHeader.defaultProps = {
  renderAs: 'header',
};

export default HeroHeader;
