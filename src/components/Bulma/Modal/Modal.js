import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import classnames from '../../../helpers/classnames';
import Element from '../Element/Element';
import ModalContent from './components/ModalContent';
import ModalCard from './components/Card';
import { ModalContext } from '../../../hooks/bulma/useBulmaModalContext';

const KEYCODES = {
  ESCAPE: 27,
};

const Modal = ({
  domRef,
  children,
  className,
  show,
  closeOnBlur,
  showClose,
  onClose,
  closeOnEsc,
  ...props
}) => {
  const ref = useRef(domRef);
  const [portalContainer, setPortalContainer] = useState();

  useEffect(() => {
    if (!show) {
      return undefined;
    }
    const doc = props.document || document;
    const container = doc.createElement('div');
    container.setAttribute('class', 'modal-container');
    doc.body.appendChild(container);
    setPortalContainer(container);

    const handleKeydown = (evt) => {
      if (evt.keyCode === KEYCODES.ESCAPE && show) {
        onClose();
      }
    };

    if (closeOnEsc) {
      doc.addEventListener('keydown', handleKeydown);
    }
    return () => {
      doc.removeEventListener('keydown', handleKeydown);
      container.parentNode.removeChild(container);
    };
  }, [show]);

  if (!portalContainer) {
    return null;
  }

  return ReactDOM.createPortal(
    <ModalContext.Provider value={{ onClose }}>
      <Element
        domRef={ref}
        className={classnames('modal', className, {
          'is-active': show,
        })}
      >
        <div
          role="presentation"
          className="modal-background"
          onClick={closeOnBlur ? onClose : undefined}
        />
        {children}
      </Element>
    </ModalContext.Provider>,
    portalContainer
  );
};

Modal.Content = ModalContent;
Modal.Card = ModalCard;

// Modal.propTypes = {
//   show: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
//   closeOnEsc: PropTypes.bool,
//   closeOnBlur: PropTypes.bool,
//   showClose: PropTypes.bool,
//   document: PropTypes.object,
//   className: PropTypes.string,
// };

Modal.defaultProps = {
  closeOnBlur: true,
  closeOnEsc: true,
  showClose: true,
  // Expose mount point for testing
  document: undefined,
};

export default Modal;
