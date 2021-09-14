import React from 'react';
import classnames from '../../../helpers/classnames';
import Element from '../Element/Element';

const Footer = ({ className, ...props }) => (
  <Element {...props} className={classnames('footer', className)} />
);

// Footer.propTypes = {
//   renderAs: PropTypes.oneOfType([
//     PropTypes.func,
//     PropTypes.string,
//     PropTypes.object,
//   ]),
// };

Footer.defaultProps = {
  renderAs: 'footer',
};

export default Footer;
