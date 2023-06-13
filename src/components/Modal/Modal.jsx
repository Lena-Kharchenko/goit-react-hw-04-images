import css from './Modal.module.css';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ largeImageURL, toglleModal }) {
  // const [returnSkeleton, setReturnSceleton] = useState(true);
  const [scelet, setScelet] = useState(true);

  // state = {
  //   returnSkeleton: true,
  //   scelet: true,
  // };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return function cleanup() {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  // useEffect(() => {
  //   window.removeEventListener('keydown', handleKeyDown);
  //   window.removeEventListener('load', showSceleton);
  // });

  showSceleton = () => {
    setScelet(false);
  };

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      toglleModal();
    }
  };

  const overlayClick = e => {
    if (e.currentTarget === e.target) {
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
