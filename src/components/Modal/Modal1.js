import React from 'react';

const Modal = ({ title, content, isActive, closeModal }) =>
  isActive ? (
    <div className="modal is-active">
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div className="modal-background" onClick={closeModal || undefined} />
      <div className="modal-content">
        <div className="box">{content}</div>
      </div>
      <button
        className="modal-close is-large"
        type="button"
        aria-label="close"
        onClick={closeModal || undefined}
      />
    </div>
  ) : null;

export default Modal;
