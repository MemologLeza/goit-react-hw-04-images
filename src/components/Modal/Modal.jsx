import { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from './Modal.module.css';

const Modal = ({ img, onClose }) => {
  useEffect(() => {
    const handleKeyDown = ({ code }) => {
      if (code === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className={styled.Overlay} onClick={onClose}>
      <div className={styled.Modal}>
        <img src={img} alt="Large" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  img: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
