import ModalContent from './components/ModalContent';
import ModalCardHeader from './components/Card/ModalCardHeader';
import ModalCardFooter from './components/Card/ModalCardFooter';
import ModalCardBody from './components/Card/ModalCardBody';
import ModalCardTitle from './components/Card/ModalCardTitle';

const Modal = {
  Content: ModalContent,
  Card: {
    Header: ModalCardHeader,
    Title: ModalCardTitle,
    Body: ModalCardBody,
    Footer: ModalCardFooter,
  },
};

export default Modal;
