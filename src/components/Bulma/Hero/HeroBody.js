import React from 'react';
import Element from '../Element/Element';
import classnames from '../../../helpers/classnames';

const HeroBody = ({ className, ...props }) => (
  <Element {...props} className={classnames(className, 'hero-body')} />
);

HeroBody.defaultProps = {
  renderAs: 'div',
};

// HeroBody.propTypes = {
//   renderAs: PropTypes.oneOfType([
//     PropTypes.func,
//     PropTypes.string,
//     PropTypes.object,
//   ]),
// };

export default HeroBody;
