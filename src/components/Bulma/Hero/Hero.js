import React from 'react';
import Element from '../Element/Element';
import classnames from '../../../helpers/classnames';
import HeroHeader from './HeroHeader';
import HeroBody from './HeroBody';
import HeroFooter from './HeroFooter';

const Hero = ({
  children,
  className,
  color,
  gradient,
  size,
  hasNavbar,
  ...props
}) => (
  <Element
    {...props}
    className={classnames('hero', className, {
      [`is-${color}`]: color,
      [`is-${size}`]: size && !hasNavbar,
      'is-bold': gradient,
      'is-fullheight-with-navbar': hasNavbar,
    })}
  >
    {children}
  </Element>
);

Hero.Header = HeroHeader;
Hero.Body = HeroBody;
Hero.Footer = HeroFooter;

// Hero.propTypes = {
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
//   gradient: PropTypes.bool,
//   size: PropTypes.oneOfType([
//     PropTypes.oneOf(['small', 'medium', 'large', 'halfheight', 'fullheight']),
//     PropTypes.string,
//   ]),
//   hasNavbar: PropTypes.bool,
//   renderAs: PropTypes.oneOfType([
//     PropTypes.func,
//     PropTypes.string,
//     PropTypes.object,
//   ]),
// };

Hero.defaultProps = {
  renderAs: 'section',
};

export default Hero;
