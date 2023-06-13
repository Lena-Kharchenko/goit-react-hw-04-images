import css from './Modal.module.css';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ largeImageURL, toglleModal }) {
  const [scelet, setScelet] = useState(true);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return function cleanup() {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const showSceleton = () => {
    setScelet(false);
  };

  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      toglleModal();
    }
  };

  const overlayClick = event => {
    if (event.currentTarget === event.target) {
      toglleModal();
    }
  };

  return createPortal(
    <div className={css.Overlay} onClick={overlayClick}>
      <div className={css.Modal}>
        <button
          className={css.Button}
          type="button"
          onClick={toglleModal}
        ></button>
        {scelet && <div className="Scelet"></div>}
        <img
          onLoad={showSceleton}
          width={900}
          height={600}
          src={largeImageURL.largeImageURL}
          alt={largeImageURL.tags}
        />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  toglleModal: PropTypes.func.isRequired,
  largeImageURL: PropTypes.object.isRequired,
};
