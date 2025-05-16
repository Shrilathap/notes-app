import React, { ReactNode } from 'react';
import './Modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}

const Modal = ({ isOpen, onClose, children }:ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal">
        <button className="custom-close-button" onClick={onClose}>x</button>
        <div className="custom-modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
