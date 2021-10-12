import React from 'react';
import Element from '../../../Element/Element';
import classnames from '../../../../../helpers/classnames';
import Button from '../../../Button/Button';

const ModalCardHeader = ({ children, className, showClose, ...props }) => (
  <Element {...props} className={classnames('modal-card-head', className)}>
    {children}
    {/* {showClose && <Button remove onClick={onClose} />} */}
  </Element>
);

ModalCardHeader.defaultProps = {
  showClose: true,
  renderAs: 'header',
};

export default ModalCardHeader;
