import React from 'react';
import Element from '../Element/Element';
import classnames from '../../../helpers/classnames';

const HeroFooter = ({ className, ...props }) => (
  <Element {...props} className={classnames(className, 'hero-foot')} />
);

// HeroFooter.propTypes = {
//   renderAs: PropTypes.oneOfType([
//     PropTypes.func,
//     PropTypes.string,
//     PropTypes.object,
//   ]),
// };

HeroFooter.defaultProps = {
  renderAs: 'footer',
};

export default HeroFooter;
