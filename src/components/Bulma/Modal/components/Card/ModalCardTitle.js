import React from 'react';
import Element from '../../../Element/Element';
import classnames from '../../../../../helpers/classnames';

const ModalCardTitle = ({ children, className, ...props }) => (
  <Element {...props} className={classnames('modal-card-title', className)}>
    {children}
  </Element>
);

// ModalCardTitle.propTypes = {
//   renderAs: PropTypes.oneOfType([
//     PropTypes.func,
//     PropTypes.string,
//     PropTypes.object,
//   ]),
// };

ModalCardTitle.defaultProps = {
  renderAs: 'p',
};

export default ModalCardTitle;
