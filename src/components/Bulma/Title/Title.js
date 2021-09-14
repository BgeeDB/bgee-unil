import React from 'react';
import Element from '../Element/Element';
import classnames from '../../../helpers/classnames';

const Title = ({
  children,
  className,
  size,
  subtitle,
  weight,
  spaced,
  heading,
  ...props
}) => (
  <Element
    {...props}
    className={classnames(
      className,
      {
        title: !subtitle && !heading,
        subtitle,
        heading,
        [`is-${size}`]: size,
        [`has-text-weight-${weight}`]: weight,
        'is-spaced': spaced && !subtitle,
      },
      'has-text-primary'
    )}
  >
    {children}
  </Element>
);

/*
Title.propTypes = {
  size: PropTypes.oneOfType([
    PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
    PropTypes.string,
    PropTypes.number,
  ]),
  weight: PropTypes.oneOf(['light', 'normal', 'semibold', 'bold']),
  subtitle: PropTypes.bool,
  heading: PropTypes.bool,
  spaced: PropTypes.bool,
  renderAs: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.object,
  ]),
};
 */

Title.defaultProps = {
  renderAs: 'h1',
};

export default Title;
